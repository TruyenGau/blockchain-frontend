import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { AuthContext } from "../components/context/auth.context";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { auth, dappazon, provider } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const getCartKey = () => `cart_${"lastWallet" || "guest"}`;


    useEffect(() => {
        const stored = localStorage.getItem(getCartKey());
        if (stored) {
            const parsed = JSON.parse(stored).map(p => ({
                ...p,
                price: ethers.BigNumber.from(p.price),
            }));
            setCart(parsed);
        }
    }, [auth.user?.address]);  // 👈 thêm dependency là ví


    const removeFromCart = (id) => {
        const updated = cart.filter((item) => item.id !== id);
        setCart(updated);
        localStorage.setItem(getCartKey(), JSON.stringify(updated));

    };

    const totalCost = cart.reduce((sum, p) => {
        return sum.add(p.price.mul(p.quantity));
    }, ethers.BigNumber.from("0"));

    const handleBuyAll = async () => {
        try {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            if (address !== auth.user.address) {
                alert("Ví không đúng với tài khoản đăng nhập!");
                return;
            }

            const itemIds = cart.map(p => p.id);
            const quantities = cart.map(p => p.quantity);

            const tx = await dappazon.connect(signer).buyMultiple(itemIds, quantities, {
                value: totalCost,
            });

            await tx.wait();
            notification.success({ message: "Mua tất cả sản phẩm thành công!" });
            localStorage.removeItem(getCartKey());

            setCart([]);
            navigate("/");
        } catch (err) {
            notification.error({
                message: "Lỗi khi mua hàng",
                description: err.reason || err.message,
            });
        }
    };
    console.log("Cart component rendered with cart:", localStorage.getItem(getCartKey()));
    return (
        <div className="container mt-5">
            <h3>🛒 Giỏ hàng của bạn</h3>

            {cart.length === 0 ? (
                <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {cart.map((item) => (
                            <li key={item.id} className="list-group-item d-flex align-items-center">
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${item.image}`}
                                    alt={item.name}
                                    style={{ width: "80px", height: "auto", marginRight: "15px", borderRadius: "8px" }}
                                />
                                <div className="flex-grow-1">
                                    <strong>{item.name}</strong><br />
                                    <small>Số lượng: {item.quantity}</small><br />
                                    <small>Giá: {ethers.utils.formatEther(item.price)} ETH</small>
                                </div>
                                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                                    Xoá
                                </button>
                            </li>
                        ))}
                    </ul>

                    <p><strong>Tổng cộng: </strong>{ethers.utils.formatEther(totalCost)} ETH</p>
                    <button className="btn btn-success" onClick={handleBuyAll}>Thanh toán tất cả</button>
                </>
            )}
        </div>
    );
};

export default Cart;
