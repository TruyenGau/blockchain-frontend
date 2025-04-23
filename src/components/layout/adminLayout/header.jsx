import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context'; // Giả sử bạn có AuthContext để lấy thông tin người dùng.

const Header = () => {
    const { auth } = useContext(AuthContext); // Lấy thông tin người dùng từ AuthContext

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            {/* Navbar Brand */}
            <Link className="navbar-brand ps-3 text-primary" to="/admin">
                <p style={{ fontSize: "50px" }}>Laptopshop</p>
            </Link>



            {/* Navbar Search */}
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <span style={{ color: 'white', }}>
                    {auth?.user?.name || "User"} {/* Lấy tên người dùng từ auth context */}
                </span>
            </form>

            {/* Navbar */}
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" >
                <li className="nav-item dropdown" >

                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li style={{ marginRight: "10px" }}>
                            <Link className="dropdown-item" to="#!">Settings</Link>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <form method="POST" action="/logout">
                                <input type="hidden" name="_csrf" value={auth?.csrfToken} />
                                <button type="submit" className="dropdown-item">Đăng xuất</button>
                            </form>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav >
    );
};

export default Header;
