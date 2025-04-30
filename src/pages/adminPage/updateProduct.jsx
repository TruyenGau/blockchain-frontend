import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/adminLayout/header';
import Footer from '../../components/layout/adminLayout/footer';
import axios from "../../util/axios.customize"; // Adjust the import path as necessary
import { useNavigate, useParams } from 'react-router-dom';
import { getAProduct } from '../../util/api';
import { notification } from 'antd';

const UpdateProduct = () => {
    const { id } = useParams();  // Lấy id từ URL
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        shortDesc: '',
        stock: '',
        category: '',
        image: null,
        address: '',
    });
    const [preview, setPreview] = useState(null);
    const getProduct = async () => {
        const data = await getAProduct(id);
        setProduct(data[0]);
    }

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const responses = await getAProduct(id); // Gọi API để lấy thông tin sản phẩm
                    const response = responses[0];
                    setFormData({
                        name: response.name,
                        price: response.price,
                        shortDesc: response.shortDesc,
                        stock: response.stock,
                        category: response.category,
                        image: response.image,
                        address: response.address,
                    });
                    setPreview(response.image); // Set preview hình ảnh từ backend
                } catch (error) {
                    console.error('Error fetching product details:', error);
                    alert('Failed to fetch product details!');
                }
            }
        };

        fetchProduct();
    }, [id]); // Chỉ gọi lại nếu id thay đổi


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUploadFileUser = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setFormData((prevData) => ({ ...prevData, image: null }));
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setFormData((prevData) => ({ ...prevData, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post(`/v1/api/updateProduct/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Check the response from backend
            notification.success({
                message: 'Chỉnh sửa sản phẩm thành công',
                showProgress: true
            });
            navigate("/showproduct");

        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product!');
        }
    };



    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Chỉnh sửa  thông tin sản phẩm</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><a href="/homeadmin">Tranng chủ</a></li>
                                <li className="breadcrumb-item"><a href="/showproduct">Sản phẩm</a></li>
                                <li className="breadcrumb-item active">Chỉnh sửa thông tin</li>
                            </ol>

                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-md-8 col-12 mx-auto">
                                        <h3>Cập nhật thông tin</h3>
                                        <hr />
                                        <form onSubmit={handleSubmit} className="row" encType="multipart/form-data">
                                            {/* Product Name */}
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label">Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Product Price */}
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label">Price:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Short Description */}
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label">Short Description:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="shortDesc"
                                                    value={formData.shortDesc}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>



                                            {/* Stock */}
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label">Stock:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="stock"
                                                    value={formData.stock}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Category */}
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label">Category:</label>
                                                <select
                                                    className="form-select"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="APPLE">Apple (MacBook)</option>
                                                    <option value="ASUS">Asus</option>
                                                    <option value="LENOVO">Lenovo</option>
                                                    <option value="DELL">Dell</option>
                                                    <option value="LG">LG</option>
                                                    <option value="ACER">Acer</option>
                                                </select>
                                            </div>

                                            {/* Image Upload */}
                                            <div>
                                                <label
                                                    htmlFor="btnUpload"
                                                    style={{
                                                        display: 'block',
                                                        width: 'fit-content',
                                                        marginTop: '15px',
                                                        padding: '5px 10px',
                                                        background: 'orange',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Hình ảnh
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="btnUpload"
                                                    hidden
                                                    onChange={handleUploadFileUser}
                                                />
                                            </div>
                                            {preview && (
                                                <div
                                                    style={{
                                                        marginTop: '10px',
                                                        height: '150px',
                                                        width: '200px',
                                                        marginBottom: '15px',
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            height: '100%',
                                                            width: '100%',
                                                            objectFit: 'contain',
                                                        }}
                                                        src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${preview}`}
                                                        alt="Preview"
                                                    />
                                                </div>
                                            )}

                                            {/* Submit Button */}
                                            <div className="col-12 mb-5" style={{ marginTop: "40px" }}>
                                                <button type="submit" className="btn btn-primary">
                                                    Cập nhật
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
