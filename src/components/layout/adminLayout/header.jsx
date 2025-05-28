import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { notification } from 'antd';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear("access_token");
        setAuth({
            isAuthenticated: false,
            user: {
                email: "",
                name: "",
                address: "",
                role: ""
            }
        });
        notification.success({
            message: 'Đăng xuất thành công',
            showProgress: true
        });
        navigate("/login");
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: '#0d1b2a', padding: '12px 20px' }}
        >
            {/* Logo thương hiệu */}
            <Link className="navbar-brand fw-bold text-warning" to="/homeadmin" style={{ fontSize: '1.8rem' }}>
                💻 LaptopShop
            </Link>

            {/* Phần bên phải */}
            <div className="d-flex align-items-center ms-auto gap-3">
                {/* Thông tin người dùng */}
                <div className="d-flex align-items-center">
                    <i className="fas fa-user-circle me-2" style={{ fontSize: '1.4rem', color: '#ffaa33' }}></i>
                    <span className="text-white fw-semibold" style={{ fontSize: '1rem' }}>
                        {auth?.user?.name || 'Admin'}
                    </span>
                </div>

                {/* Dropdown */}
                <div className="dropdown">
                    <button
                        className="btn btn-sm btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={logout}
                    >
                        Đăng xuất
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Header;
