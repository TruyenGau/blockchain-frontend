import React, { useState, useEffect } from 'react';

const images = [
    {
        src: 'http://localhost:8081/product/banner/hero-img-1.png',
        alt: 'Gaming',
        label: 'Gaming',
    },
    {
        src: 'http://localhost:8081/product/banner/hero-img-2.png',
        alt: 'Laptop',
        label: 'Laptop',
    },
    {
        src: 'http://localhost:8081/product/banner/hero-img-3.png',
        alt: 'Phụ kiện',
        label: 'Phụ kiện',
    },
];

const Banner = () => {
    const [index, setIndex] = useState(0);

    // Tự động chuyển slide mỗi 3 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // const prevSlide = () => {
    //     setIndex((prev) => (prev - 1 + images.length) % images.length);
    // };

    // const nextSlide = () => {
    //     setIndex((prev) => (prev + 1) % images.length);
    // };

    return (
        <div
            className="w-100 d-flex justify-content-center py-5"
            style={{
                background: 'linear-gradient(to right, #fefcea, #f1dae0)',
            }}
        >
            <div
                className="w-100 px-4"
                style={{
                    maxWidth: '1200px',
                    borderRadius: '12px',
                }}
            >
                <div className="row align-items-center">
                    {/* Bên trái: text */}
                    <div className="col-lg-7 text-start">
                        <h5 className="text-warning fw-bold">100% Sản Phẩm Chính Hãng</h5>
                        <h1
                            className="display-5 fw-bold"
                            style={{ color: '#5fb709', fontSize: '3.2rem', lineHeight: '1.2' }}
                        >
                            Hàng cao cấp<br />Tiết kiệm chi phí
                        </h1>
                    </div>

                    {/* Bên phải: Custom Carousel */}
                    <div className="col-lg-5 position-relative">
                        <div
                            className="shadow rounded overflow-hidden position-relative"
                            style={{
                                height: '300px', overflow: 'hidden',
                                position: 'relative'
                            }}
                        >
                            <img
                                src={images[index].src}
                                alt={images[index].alt}
                                className="w-100 h-100 object-fit-cover"
                            />
                            <a
                                href="#"
                                className="btn position-absolute top-50 start-50 translate-middle px-3 py-2 text-white fw-bold shadow"
                                style={{
                                    backgroundColor: '#ffaa33',
                                    borderRadius: '10px',
                                    fontSize: '1rem',
                                    border: 'none',
                                }}
                            >
                                {images[index].label}
                            </a>
                        </div>

                        {/* Nút điều hướng
                        <button
                            onClick={prevSlide}
                            className="btn position-absolute top-50 start-0 translate-middle-y"
                            style={{
                                background: 'rgba(0,0,0,0.3)',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '50%',
                                left: '10px',
                                zIndex: 2,
                            }}
                        >
                            ❮
                        </button>
                        <button
                            onClick={nextSlide}
                            className="btn position-absolute top-50 end-0 translate-middle-y"
                            style={{
                                background: 'rgba(0,0,0,0.3)',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '50%',
                                rightright: '10px',
                                zIndex: 2,
                            }}
                        >
                            ❯ */}
                        {/* </button> */}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Banner;
