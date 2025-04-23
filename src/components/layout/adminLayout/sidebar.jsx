import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Features</div>

                        {/* Dashboard link */}
                        <Link className="nav-link" to="/admin">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Dashboard
                        </Link>

                        {/* User link */}
                        <Link className="nav-link" to="/admin/user">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            User
                        </Link>

                        {/* Product link */}
                        <Link className="nav-link" to="/createproduct">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-box"></i>
                            </div>
                            Product
                        </Link>

                        {/* Order link */}
                        <Link className="nav-link" to="/admin/order">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-clipboard-list"></i>
                            </div>
                            Order
                        </Link>

                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Truyền đẹp trai {/* Thay bằng tên người dùng động nếu muốn */}
                </div>
            </nav>
        </div>
    );
};

export default SideBar;
