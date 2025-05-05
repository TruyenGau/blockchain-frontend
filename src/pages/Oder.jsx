import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const Order = () => {
    const { auth, dappazon, provider } = useContext(AuthContext);
    const [purchasedItems, setPurchasedItems] = useState([]);

    // Hàm để lấy danh sách các sản phẩm đã mua của người dùng
    const fetchPurchasedProducts = async (address) => {
        try {
            // Lấy danh sách các itemId, quantity, purchaseTime đã mua của người dùng
            const [itemIds, quantities, purchaseTimes] = await dappazon.getUserPurchases(address);

            // Lấy thông tin chi tiết sản phẩm từ smart contract
            const products = [];
            for (let i = 0; i < itemIds.length; i++) {
                const product = await dappazon.items(itemIds[i]);
                products.push({
                    ...product,
                    quantity: quantities[i], // Lưu số lượng sản phẩm đã mua
                    purchaseTime: purchaseTimes[i] // Lưu thời gian mua
                });
            }

            // Cập nhật state với danh sách sản phẩm đã mua
            setPurchasedItems(products);
        } catch (error) {
            console.error("Không thể lấy danh sách sản phẩm đã mua", error);
        }
    };

    // Dùng useEffect để gọi hàm fetchPurchasedProducts khi component được render
    useEffect(() => {
        if (auth?.user?.address) {
            fetchPurchasedProducts(auth.user.address);
        }
    }, [auth]);  // Chỉ gọi lại khi auth thay đổi

    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="tab-class text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start">
                            <h1>Sản phẩm đã mua</h1>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                <div className="col-lg-12">
                                    <div className="row g-4">
                                        {purchasedItems.length === 0 ? (
                                            <p>Chưa có sản phẩm đã mua</p>
                                        ) : (
                                            purchasedItems.map((product) => (
                                                <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item">
                                                        <div className="fruite-img">
                                                            <img
                                                                src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`}
                                                                alt="Product"
                                                                className="img-fluid w-100 rounded-top"
                                                            />
                                                        </div>
                                                        <div
                                                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                                            style={{ top: "10px", left: "10px" }}
                                                        >
                                                            Laptop
                                                        </div>
                                                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                            <h4 style={{ fontSize: "15px" }}>
                                                                <Link to={`/product/${product.id}`} state={{ product }}>
                                                                    {product.name}
                                                                </Link>
                                                            </h4>
                                                            <p style={{ fontSize: "13px" }}>{product.shortDesc}</p>
                                                            <div className="d-flex flex-lg-wrap justify-content-center flex-column">
                                                                <p
                                                                    style={{
                                                                        fontSize: "15px",
                                                                        textAlign: "center",
                                                                        width: "100%",
                                                                    }}
                                                                    className="text-dark fw-bold mb-3"
                                                                >
                                                                    {ethers.utils.formatUnits(product.price.toString(), 'ether')} ETH
                                                                </p>
                                                                <p className="text-center">
                                                                    Số lượng đã mua: {ethers.utils.formatUnits(product.quantity, 'wei')}
                                                                </p>
                                                                {/* Thêm thời gian mua */}
                                                                <p
                                                                    style={{
                                                                        fontSize: "14px",
                                                                        color: "#495057",
                                                                        fontWeight: "500",
                                                                        textAlign: "center",
                                                                        marginTop: "10px",
                                                                        padding: "5px",
                                                                        backgroundColor: "#f8f9fa",
                                                                        borderRadius: "5px",
                                                                        display: "inline-block",
                                                                        width: "100%",
                                                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                                                    }}
                                                                >
                                                                    <span style={{
                                                                        color: "#28a745",
                                                                        fontSize: "16px",
                                                                        fontWeight: "bold"
                                                                    }}>Thời gian mua: </span>
                                                                    {new Date(product.purchaseTime * 1000).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
