import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="container-fluid text-white footer pt-5 mt-5 bg-dark">
                <div className="container bg-dark">
                    <div className="pb-4 mb-4" style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}>
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <h1 className="text-primary mb-0">Laptopshop</h1>
                                    <p className="text-secondary mb-0">@Truyendeptrai</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="mb-3 text-light">Chất lượng là ưu tiên hàng đầu</h4>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="mb-3 text-light">Shop Info</h4>
                                <a href="#" className="btn-link">About Us</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="mb-3 text-light">Account</h4>
                                <a href="#" className="btn-link">My Account</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="mb-3 text-light">Contact</h4>
                                <a href="#" className="btn-link">Author: Meo Meo</a>
                                <a href="#" className="btn-link">truyendeptrai</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer End */}

            {/* Copyright Start */}
            <div className="container-fluid copyright py-4 bg-dark">
                <div className="container">
                    <div className="row bg-dark">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            <span>
                                <a href="https://hoidanit.vn" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-copyright text-light me-2"></i>Ai lop du
                                </a>, All right reserved.
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            {/* Copyright End */}
        </>
    );
};

export default Footer;
