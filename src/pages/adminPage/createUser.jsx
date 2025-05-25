import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import axios from '../../util/axios.customize';
import Header from '../../components/layout/adminLayout/header';
import Footer from '../../components/layout/adminLayout/footer';

const CreateUser = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/v1/api/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            notification.success({
                message: 'Thành công',
                description: 'Tạo người dùng mới thành công!',
            });

            navigate('/showUser');
        } catch (err) {
            notification.error({
                message: 'Thất bại',
                description: err?.response?.data?.message || 'Tạo người dùng thất bại!',
            });
        }
    };

    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Người dùng</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><a href="/homeadmin">Trang Chủ</a></li>
                                <li className="breadcrumb-item"><a href="/showUser">Người dùng</a></li>
                                <li className="breadcrumb-item active">Tạo người dùng mới</li>
                            </ol>

                            <div className="mt-5 row">
                                <div className="col-md-8 col-12 mx-auto">
                                    <h3>Tạo người dùng mới</h3>
                                    <hr />
                                    <form onSubmit={handleSubmit} className="row">
                                        {/* Name */}
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Tên:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Mật khẩu:</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Xác nhận mật khẩu:</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                className="form-control"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* Submit */}
                                        <div className="col-12 mt-4 mb-5">
                                            <button type="submit" className="btn btn-primary">Tạo người dùng</button>
                                        </div>
                                    </form>
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

export default CreateUser;
