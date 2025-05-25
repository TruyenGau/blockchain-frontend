import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/layout/adminLayout/header';
import SideBar from '../../components/layout/adminLayout/sidebar';
import Footer from '../../components/layout/adminLayout/footer';
import { Button } from 'antd';
import axios from "../../util/axios.customize"; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/auth.context';
import { ethers } from "ethers";
import Dappazon from "../../../blockchain/abis/Dappazon.json";
import config from "../../config.json";
import { getCountProduct } from '../../util/api';
import { notification } from 'antd';
const CreateProduct = () => {

    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    // const getCoutProduct = async () => {
    //     const result = await getCountProduct();
    //     setCount(result.data + 1);
    // }
    // useEffect(() => {
    //     getCoutProduct();
    // }, [])
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        shortDesc: '',
        stock: '',
        category: '',
        image: null,
        address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        numberproduct: 0
    });

    const getCoutProduct = async () => {
        try {
            const result = await getCountProduct();
            setCount(result.data + 1);  // Set the count value from API
        } catch (error) {
            console.error('Error fetching product count:', error);
        }
    };

    // Update the numberproduct whenever count changes
    useEffect(() => {
        if (count > 0) {
            setFormData((prevData) => ({
                ...prevData,
                numberproduct: count,  // Set product number dynamically based on count
            }));
        }
    }, [count]);  // Re-run when count is updated

    useEffect(() => {
        getCoutProduct();
    }, []);

    const [preview, setPreview] = useState(null);

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
            const response = await axios.post('http://localhost:8081/v1/api/createProduct', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Kiểm tra phản hồi từ backend
            // navigate("/homeadmin");

            // Sau khi tạo sản phẩm, bạn có thể sử dụng tên ảnh từ backend và thực hiện hành động tiếp theo
            const imageName = response.product.image; // Lấy tên ảnh từ response
            console.log("Product Image Name:", imageName);

            // Tiếp theo bạn có thể dùng imageName này để thực hiện các thao tác khác (ví dụ, lưu vào blockchain)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            const dappazon = new ethers.Contract(
                config[network.chainId].dappazon.address,
                Dappazon,
                provider
            );
            const signer = provider.getSigner();
            const priceInWei = ethers.utils.parseUnits(formData.price, "ether");

            const transaction = await dappazon
                .connect(signer)
                .addProduct(formData.name,
                    formData.category,
                    response.product.image, // Truyền tên ảnh đã lấy từ backend
                    priceInWei,
                    formData.shortDesc,
                    formData.stock
                );
            await transaction.wait();
            notification.success({
                message: 'Thành công',
                description: 'Tạo sản phẩm thành công!',
                showProgress: true
            });

            navigate("/showproduct");

        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product!');
        }
    };




    console.log("check count", count);

    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Sản Phẩm</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><a href="/homeadmin">Trang Chủ</a></li>
                                <li className="breadcrumb-item"><a href="/showProduct">Sản Phẩm</a></li>
                                <li className="breadcrumb-item active">Tạo sản phẩm mới</li>
                            </ol>
                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-md-8 col-12 mx-auto">
                                        <h3>Tạo sản phẩm mới</h3>
                                        <hr />
                                        <form
                                            onSubmit={handleSubmit}
                                            className="row"
                                            encType="multipart/form-data"
                                        >
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

                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label">Address:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    value={formData.address}
                                                    // onChange={handleChange}  // Optional: you can still keep it, but the value won't change
                                                    readOnly  // This makes the input read-only and non-editable
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
                                                    name="category" // Changed from "factory" to "category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="APPLE">Apple</option>
                                                    <option value="ASUS">Asus</option>
                                                    <option value="LENOVO">Lenovo</option>
                                                    <option value="DELL">Dell</option>
                                                    <option value="LG">LG</option>
                                                    <option value="ACER">Acer</option>
                                                </select>
                                            </div>

                                            {/* Stock */}
                                            <div className="mb-3 col-12 col-md-6">
                                                {/* <label className="form-label">ProducNumber:</label> */}
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="numberproduct"
                                                    value={formData.numberproduct}
                                                    // onChange={handleChange}
                                                    required
                                                    readOnly
                                                    hidden
                                                />
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
                                                    Thêm ảnh mới
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image" // Changed from "file" to "image"
                                                    id="btnUpload"
                                                    hidden
                                                    onChange={handleUploadFileUser}
                                                />
                                            </div>
                                            {preview && (
                                                <div
                                                    style={{
                                                        marginTop: '10px',
                                                        height: '100px',
                                                        width: '150px',
                                                        marginBottom: '15px',
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            height: '100%',
                                                            width: '100%',
                                                            objectFit: 'contain',
                                                        }}
                                                        src={preview}
                                                        alt="Preview"
                                                    />
                                                </div>
                                            )}

                                            {/* Submit Button */}
                                            <div className="col-12 mb-5" style={{ marginTop: "40px" }}>
                                                <button type="submit" className="btn btn-primary">
                                                    Tạo sản phẩm
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
