// React component
import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../util/api';  // Đảm bảo bạn đã tạo API getAllUsers
import Header from '../../components/layout/adminLayout/header';
import Footer from '../../components/layout/adminLayout/footer';
import { useNavigate } from 'react-router-dom';
import { Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const ShowUser = () => {
    const [users, setUsers] = useState([]);  // Khởi tạo users với mảng trống
    const navigate = useNavigate();

    // Fetch users data
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await getAllUsers();
                console.log('API Response:', result);

                if (result && result.data && Array.isArray(result.data)) {
                    const filteredUsers = result.data.filter(user => user.role === 'user');
                    if (filteredUsers.length > 0) {
                        setUsers(filteredUsers);
                    } else {
                        console.log('Không có người dùng có role là user');
                        setUsers([]);
                    }
                } else {
                    console.log('Không có dữ liệu người dùng');
                    setUsers([]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người dùng:', error);
                setUsers([]);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = (userId) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa người dùng này không?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            okType: 'danger',
            onOk: async () => {
                try {
                    // Gọi API xóa người dùng
                    const result = await deleteUser(userId);
                    if (result.EC === 0) {
                        // Xóa người dùng thành công, cập nhật lại danh sách
                        setUsers(users.filter(user => user._id !== userId));
                        notification.success({
                            message: 'Xóa thành công',
                            description: 'Người dùng đã được xóa.',
                        });
                    } else {
                        // Xử lý thất bại
                        notification.error({
                            message: 'Xóa thất bại',
                            description: result.EM || 'Không thể xóa người dùng.',
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa người dùng:", error);
                    notification.error({
                        message: 'Lỗi hệ thống',
                        description: 'Đã xảy ra lỗi khi xóa người dùng.',
                    });
                }
            }
        });
    };



    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <div id="layoutSidenav_content" className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                    <main className="flex-grow-1">
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Quản lí người dùng</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><a href="/homeadmin">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Người dùng</li>
                            </ol>

                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-md-12 col-12">
                                        <div className="d-flex justify-content-between">
                                            <h3>Danh sách người dùng</h3>
                                            <a href="/createUser" className="btn btn-primary">Tạo người dùng mới</a>
                                        </div>
                                        <hr />
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Address</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(users) && users.length > 0 ? (
                                                        users.map((user) => (
                                                            <tr key={user._id}>
                                                                <td>{user._id}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.address}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-info"
                                                                        onClick={() => navigate(`/detailuser/${user._id}`)}
                                                                    >
                                                                        Xem chi tiết
                                                                    </button>

                                                                    <button
                                                                        className="btn btn-warning ms-2"
                                                                        onClick={() => navigate(`/updateUser/${user._id}`)}
                                                                    >
                                                                        Chỉnh sửa
                                                                    </button>

                                                                    <button
                                                                        className="btn btn-danger ms-2"
                                                                        onClick={() => handleDeleteUser(user._id)}
                                                                    >
                                                                        Xóa
                                                                    </button>

                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className="text-center">Không có người dùng</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
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

export default ShowUser;
