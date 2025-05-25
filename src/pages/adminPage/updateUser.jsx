import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'; // thêm useNavigate để điều hướng
import { getUserDetail, updateUser } from '../../util/api';
import { notification } from 'antd';
import Header from '../../components/layout/adminLayout/header';

const EditUser = () => {
    const { id } = useParams(); // lấy id từ URL
    const navigate = useNavigate(); // Khai báo hook để điều hướng
    const [form, setForm] = useState({ name: "", email: "", address: "" });

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUserDetail(id);
            if (res?.data?.data) {
                setForm(res.data.data);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateUser(id, form.name, form.email, form.address);
        console.log("Res data:", res.data);
        if (res?.data?._id) {
            notification.success({
                message: 'Cập nhật người dùng thành công!',
            });
            // Sau khi cập nhật thành công, điều hướng về trang danh sách người dùng
            navigate('/showUser'); // Đảm bảo đường dẫn này đúng với trang danh sách người dùng của bạn
        } else {
            notification.error({
                message: 'Cập nhật thất bại!',
                description: 'Không nhận được phản hồi hợp lệ từ server.',
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
                            <h1 className="mt-4">Chỉnh sửa thông tin người dùng</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><a href="/homeadmin">Tranng chủ</a></li>
                                <li className="breadcrumb-item"><a href="/showUser">Nguười dùng</a></li>
                                <li className="breadcrumb-item active">Chỉnh sửa thông tin</li>
                            </ol>
                            <div className="row">
                                <div className="col-md-6 col-12 mx-auto mt-4">
                                    <form onSubmit={handleSubmit} className="card p-4 shadow">
                                        <h4 className="mb-4 text-center">Cập nhật người dùng</h4>
                                        {/* Các input giữ nguyên */}
                                        <div className="mb-3">
                                            <label className="form-label">Tên:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Địa chỉ:</label>
                                            <input
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                value={form.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">
                                                Cập nhật
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
