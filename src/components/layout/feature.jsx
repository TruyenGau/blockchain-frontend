import React from "react";

const Feature = () => {
    return (
        <div className="container-fluid features">
            <div className="container py-5">
                <div className="row g-4">
                    {/* Feature 1 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="features-item text-center rounded bg-light p-4">
                            <div className="  mb-5 mx-auto">
                                <i className="fas fa-car-side fa-3x text-warning"></i>
                            </div>
                            <div className="features-content text-center">
                                <h5>Free Shipping</h5>
                                <p className="mb-0">Hỏa tốc trong 2h</p>
                            </div>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="features-item text-center rounded bg-light p-4">
                            <div className=" mb-5 mx-auto">
                                <i className="fas fa-user-shield fa-3x text-warning"></i>
                            </div>
                            <div className="features-content text-center">
                                <h5>Security Payment</h5>
                                <p className="mb-0">Giao dịch an toàn</p>
                            </div>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="features-item text-center rounded bg-light p-4">
                            <div className="mb-5 mx-auto">
                                <i className="fas fa-exchange-alt fa-3x text-warning"></i>
                            </div>
                            <div className="features-content text-center">
                                <h5>30 Day Return</h5>
                                <p className="mb-0">Đổi trả miễn phí</p>
                            </div>
                        </div>
                    </div>
                    {/* Feature 4 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="features-item text-center rounded bg-light p-4">
                            <div className="mb-5 mx-auto">
                                <i className="fa fa-phone-alt fa-3x text-warning"></i>
                            </div>
                            <div className="features-content text-center">
                                <h5>24/7 Support</h5>
                                <p className="mb-0">Hỗ trợ nhiệt tình</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;
