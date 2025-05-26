import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/lightbox.min.css";
import "./css/owl.carousel.min.css";
import { ethers } from "ethers";
import { AuthContext } from "../components/context/auth.context";
import { notification } from "antd";
import Rating from "../components/layout/Rating";

const ProductDetail = () => {
    const location = useLocation();
    const [reviewComment, setReviewComment] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [reviews, setReviews] = useState([]);

    const { product } = location.state;
    const { auth, setAuth, dappazon, setDappazon, provider, setProvider } = useContext(AuthContext);

    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };
    const buyHandler = async () => {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        if (address !== auth.user.address) {
            alert("Địa chỉ ví MetaMask hiện tại không trùng với ví của người dùng!. Vui lòng chọn đúng tài khoản");
            return;
        }
        const transaction = await dappazon
            .connect(signer)
            .buy(product.id, 1, { value: product.price });
        await transaction.wait();

        // alert("Purchase successful!", address);
        notification.success({
            message: "Mua sản phẩm thành công!",
            showProgress: true


        })
    };

    const submitReview = async () => {
        try {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            if (address !== auth.user.address) {
                alert("Địa chỉ ví MetaMask hiện tại không trùng với ví của người dùng!. Vui lòng chọn đúng tài khoản");
                return;
            }
            const transaction = await dappazon
                .connect(signer).addReview(product.id, reviewRating, reviewComment);
            await transaction.wait();
            notification.success({ message: "Gửi đánh giá thành công!" });
            setReviewComment("");
            setReviewRating(5);
            await loadReviews();
        } catch (err) {
            notification.error({ message: "Không thể gửi đánh giá", description: err.reason || err.message });
        }
    };

    const loadReviews = async () => {
        try {

            const [users, ratings, comments, timestamps] = await dappazon.getReviews(product.id);
            const formatted = users.map((u, i) => ({
                user: u,
                rating: Number(ratings[i]),
                comment: comments[i],
                time: new Date(timestamps[i] * 1000).toLocaleString()
            }));
            setReviews(formatted);
        } catch (err) {
            console.error("Lỗi khi load đánh giá:", err);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);


    return (
        <div className="container-fluid  mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="/">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Chi Tiết Sản Phẩm
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="border rounded">
                                    <a href="#">
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`} alt="Product"
                                            className="img-fluid rounded"

                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h4 className="fw-bold mb-3">{product.name}</h4>
                                <p className="mb-3">{product.factory}</p>
                                <h5 className="fw-bold mb-3">
                                    {ethers.utils.formatUnits(product.price, 'ether')} ETH
                                </h5>
                                <div className="d-flex mb-4">
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <p className="mb-4">{product.shortDesc}</p>
                                <p className="mb-4">Số lượng sản phẩm: {ethers.utils.formatUnits(product.stock, 'wei')}</p>

                                <div className="input-group quantity mb-5" style={{ width: "100px" }}>
                                    <div className="input-group-btn">
                                        <button
                                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                                            onClick={() => setQuantity(quantity - 1)}  // Giảm số lượng
                                        >
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm text-center border-0"
                                        value={quantity} // Gắn giá trị quantity vào input
                                        onChange={handleQuantityChange} // Thêm onChange để xử lý sự thay đổi
                                    />
                                    <div className="input-group-btn">
                                        <button
                                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                                            onClick={() => setQuantity(quantity + 1)}  // Tăng số lượng
                                        >
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>

                                <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                                    onClick={buyHandler}>
                                    <i className="fa fa-shopping-bag me-2 text-primary"></i>
                                    Mua
                                    {console.log("mua san pham")}
                                </button>

                            </div>
                            <div className="col-lg-12">
                                <nav>
                                    <div className="nav nav-tabs mb-3">
                                        <button
                                            className="nav-link active border-white border-bottom-0"
                                            type="button"
                                            role="tab"
                                            id="nav-about-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#nav-about"
                                            aria-controls="nav-about"
                                            aria-selected="true"
                                        >
                                            Mô tả
                                        </button>
                                    </div>
                                </nav>
                                <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                    <p>{product.detailDesc}</p>

                                    <div className="review-form">
                                        <style>{
                                            `.review-form {
                                                background: #f9f9f9;
                                                padding: 20px;
                                                border-radius: 12px;
                                                border: 1px solid #ddd;
                                                margin-top: 30px;
                                                }

                                                .review-form label {
                                                font-weight: 500;
                                                margin-bottom: 5px;
                                                display: block;
                                                }

                                                .review-form select,
                                                .review-form textarea {
                                                border-radius: 6px;
                                                border: 1px solid #ccc;
                                                }

                                                .review-form textarea {
                                                resize: vertical;
                                                }

                                                .review-form button {
                                                background-color: #78be20;
                                                color: white;
                                                border: none;
                                                padding: 10px 20px;
                                                font-weight: 500;
                                                border-radius: 8px;
                                                transition: background 0.3s ease;
                                                }

                                                .review-form button:hover {
                                                background-color: #5fa000;
                                                }
                                                `}</style>
                                        <h5 className="mb-3">Đánh giá sản phẩm</h5>

                                        <div className="mb-3">
                                            <label>Số sao:</label>
                                            <select className="form-select w-auto" value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <option key={s} value={s}>{s} sao</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label>Bình luận:</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Viết cảm nghĩ của bạn..."
                                                value={reviewComment}
                                                onChange={(e) => setReviewComment(e.target.value)}
                                            />
                                        </div>

                                        <button onClick={submitReview}>Gửi đánh giá</button>
                                    </div>


                                    <div className="mt-5">
                                        <h5>Đánh giá của người dùng</h5>
                                        {reviews.length === 0 && <p>Chưa có đánh giá nào.</p>}
                                        {reviews.map((r, idx) => (
                                            <div key={idx} className="border p-3 my-2 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                                                <div className="mb-1">
                                                    {
                                                        < Rating value={r.rating} />
                                                    }
                                                </div>
                                                <p>{r.comment}</p>
                                                <small className="text-muted">bởi {r.user.slice(0, 6)}... lúc {r.time}</small>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <div className="col-lg-12">
                                <div className="mb-4">
                                    <h4>Categories</h4>
                                    <ul className="list-unstyled fruite-categorie">
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Apples
                                                </a>
                                                <span>(3)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Dell
                                                </a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Asus
                                                </a>
                                                <span>(2)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Acer
                                                </a>
                                                <span>(8)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Lenovo
                                                </a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
