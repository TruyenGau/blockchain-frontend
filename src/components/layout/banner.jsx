import React from 'react';

const Banner = () => {
    return (
        <div className="container-fluid mb-5 hero-header">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-md-12 col-lg-7">
                        <h4 className="mb-3 text-secondary">100% Sản Phẩm Chính Hãng</h4>
                        <h1 className="mb-5 display-3 text-primary">Hàng cao cấp<br /> Rẻ vô địch</h1>
                    </div>
                    <div className="col-md-12 col-lg-5">
                        <div id="carouselExample" className="carousel slide position-relative" data-bs-ride="carousel">
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active rounded">
                                    <img src={"http://localhost:8081/product/banner/hero-img-1.png"} className="img-fluid w-100 h-100 bg-secondary rounded" alt="Gaming" />
                                    <a href="#" className="btn px-4 py-2 text-white rounded">Gaming</a>
                                </div>
                                <div className="carousel-item rounded">
                                    <img src={"http://localhost:8081/product/banner/hero-img-2.png"} className="img-fluid w-100 h-100 rounded" alt="Laptop" />
                                    <a href="#" className="btn px-4 py-2 text-white rounded">Laptop</a>
                                </div>
                                <div className="carousel-item rounded">
                                    <img src={"http://localhost:8081/product/banner/hero-img-3.png"} className="img-fluid w-100 h-100 rounded" alt="Phụ kiện" />
                                    <a href="#" className="btn px-4 py-2 text-white rounded">Phụ kiện</a>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
