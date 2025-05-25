import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetail } from '../../util/api';
import Header from '../../components/layout/adminLayout/header';
import Footer from '../../components/layout/adminLayout/footer';

const DetailUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUserDetail(id);
                if (result.EC === 0) {
                    setUser(result.data);
                } else {
                    console.log(result.EM);
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết người dùng:', error);
            }
        };

        fetchUser();
    }, [id]);

    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <div id="layoutSidenav_content" className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                    <main className="flex-grow-1">
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Chi tiết người dùng</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><a href="/homeadmin">Trang chủ</a></li>
                                <li className="breadcrumb-item"><a href="/showuser">Người dùng</a></li>
                                <li className="breadcrumb-item active">Chi tiết</li>
                            </ol>

                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-md-6 col-12 mx-auto">
                                        <div className="card">
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item"><strong>ID:</strong> {user._id}</li>
                                                    <li className="list-group-item"><strong>Tên:</strong> {user.name}</li>
                                                    <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                                                    <li className="list-group-item"><strong>Địa chỉ:</strong> {user.address}</li>
                                                    <li className="list-group-item"><strong>Vai trò:</strong> {user.role}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <button className="btn btn-success mt-4" onClick={() => navigate('/showuser')}>
                                            Trở về danh sách
                                        </button>
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

export default DetailUser;
