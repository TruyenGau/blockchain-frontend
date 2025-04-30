import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail } from '../../util/api';  // Đảm bảo bạn đã import API đúng
import Header from '../../components/layout/adminLayout/header';
import Footer from '../../components/layout/adminLayout/footer';

const DetailProduct = () => {
    const { id } = useParams();  // Lấy id từ URL
    const [product, setProduct] = useState({});
    const navigate = useNavigate();  // Sử dụng useNavigate thay cho history.push

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProductDetail(id);  // Lấy dữ liệu sản phẩm
                setProduct(result[0]);  // Cập nhật dữ liệu sản phẩm vào state
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <div id="layoutSidenav_content" className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                    <main className="flex-grow-1">
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Chi tiết sản phẩm</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><a href="/homeadmin">Trang chủ</a></li>
                                <li className="breadcrumb-item"><a href="/showproduct">Sản phẩm</a></li>
                                <li className="breadcrumb-item active">Chi tiết sản phẩm</li>
                            </ol>

                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-md-6 col-12 mx-auto">
                                        <div className="d-flex justify-content-between">
                                            {/* <h3>Product detail with ID: {id}</h3> */}
                                        </div>

                                        <hr style={{ width: '80%' }} />
                                        <div className="card" style={{ width: '60%' }}>
                                            <img
                                                className="card-img-top"
                                                src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`}
                                                alt="Product image"
                                            />
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">ID: {product._id}</li>
                                                <li className="list-group-item">Name: {product.name}</li>
                                                <li className="list-group-item">Price: {product.price}</li>
                                                <li className="list-group-item">Category: {product.category}</li>
                                                <li className="list-group-item">Stock: {product.stock}</li>
                                                <li className="list-group-item">Description: {product.shortDesc}</li>


                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Đặt nút "Back" ở phía dưới */}
                    <div style={{ marginLeft: '1050px' }}>
                        <button
                            className="btn btn-success mt-3 mb-4"
                            onClick={() => navigate('/showproduct')}  // Sử dụng useNavigate thay cho history.push
                        >
                            Trở về
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
