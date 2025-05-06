import React, { useEffect, useState } from 'react';
import { deleteProduct, getAllProduct } from '../../util/api';
import { use } from 'react';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import { ethers } from "ethers";
import Dappazon from "../../../blockchain/abis/Dappazon.json";
import config from "../../config.json";

const ShowProduct = () => {
    const [products, setProducts] = useState([]);
    const getAllProducts = async () => {
        const data = await getAllProduct();
        setProducts(data);
    }
    useEffect(() => {
        getAllProducts()
    }, []);
    console.log("products", products);

    const handleDeleteProduct = async (id) => {
        ;
        const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này không?`);
        if (isConfirmed) {
            try {
                const result = await deleteProduct(id);
                if (result.EC === 1) {
                    // Xóa sản phẩm khỏi danh sách trên giao diện mà không cần gọi lại API
                    setProducts(products.filter(product => product._id !== id));
                    // notification.success({
                    //     message: 'Thành công',
                    //     description: 'Xóa sản phẩm thành công!',
                    //     showProgress: true
                    // });
                } else {
                    alert("Failed to delete the product.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("An error occurred while deleting the product.");
            }
        }
    }

    const handleDeleteProductContract = async (id) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            const signer = provider.getSigner();

            const dappazon = new ethers.Contract(
                config[network.chainId].dappazon.address,
                Dappazon,
                signer
            );


            const deleteProduct = await dappazon.deleteProduct(id);


            await deleteProduct.wait();


            notification.success({
                message: 'Thành công',
                description: 'Xóa sản phẩm thành công!',
                showProgress: true
            });
        } catch (error) {
            console.error("Error deleting product from contract:", error);
            alert("Có lỗi xảy ra khi xóa sản phẩm từ hợp đồng.");
        }
    };



    console.log("products", products);


    return (
        <div className="sb-nav-fixed">
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Quản lí sản phẩm</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item">
                                    <a href="/homeadmin">Trang chủ</a>
                                </li>
                                <li className="breadcrumb-item active">Sản phẩm</li>
                            </ol>
                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-12 mx-auto">
                                        <div className="d-flex justify-content-between">
                                            <h3>Danh sách sản phẩm</h3>
                                            <a href="/createproduct" className="btn btn-primary">Tạo sản phẩm mới</a>
                                        </div>
                                        <hr />
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Category</th>
                                                    <th>Image</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product) => (
                                                    <tr key={product.id}>
                                                        <th>{product._id}</th>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td className="text-center">
                                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`} alt="Product"
                                                                style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                                                        </td>


                                                        <td>
                                                            <Link to={`/getProductDetail/${product._id}`} className="btn btn-success">Xem </Link>
                                                            <Link to={`/updateProduct/${product._id}`} className="btn btn-warning mx-2">Chỉnh sửa</Link>
                                                            <button className="btn btn-danger" onClick={() => { handleDeleteProduct(product._id); handleDeleteProductContract(product.numberproduct) }}>Xóa</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer>
                        {/* You can include your footer component here */}
                    </footer>
                </div>
            </div >

            <script src="js/scripts.js"></script>
        </div >
    );
};

export default ShowProduct;
