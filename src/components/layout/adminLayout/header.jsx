import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const Header = () => {
    const { auth } = useContext(AuthContext);

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: '#0d1b2a', padding: '12px 20px' }}
        >
            {/* Logo thương hiệu */}
            <Link className="navbar-brand fw-bold text-warning" to="/admin" style={{ fontSize: '1.8rem' }}>
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
                        className="btn btn-sm btn-outline-light dropdown-toggle"
                        id="navbarDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Tuỳ chọn
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="navbarDropdown">
                        <li>
                            <Link className="dropdown-item" to="#!">⚙️ Cài đặt</Link>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <form method="POST" action="/logout" className="m-0">
                                <input type="hidden" name="_csrf" value={auth?.csrfToken} />
                                <button type="submit" className="dropdown-item">🚪 Đăng xuất</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
