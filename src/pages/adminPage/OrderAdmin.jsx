import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { Table, Spin, notification } from "antd";
import Dappazon from "../../../blockchain/abis/Dappazon.json";
import config from "../../config.json";
import { AuthContext } from "../../components/context/auth.context";
import Header from "../../components/layout/adminLayout/header";

const OrderAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState({});
    const { provider, dappazon, setProvider, setDappazon } = useContext(AuthContext);

    // Load all items and save details into `items` object
    const loadItems = async (contract) => {
        const itemMap = {};
        let index = 1;
        try {
            while (true) {
                const item = await contract.items(index);
                if (item.seller === ethers.constants.AddressZero) break;

                itemMap[item.id.toString()] = {
                    name: item.name,
                    image: item.image,
                    price: ethers.utils.formatEther(item.price.toString()) + " ETH",
                };
                index++;
            }
        } catch (err) {
            console.log("Kết thúc load items", err);
        }
        setItems(itemMap);
    };

    // Gọi khi component mount
    const fetchOrders = async () => {
        if (!window.ethereum) {
            notification.error({ message: "Vui lòng cài MetaMask!" });
            return;
        }

        try {
            let localProvider = provider;
            let localContract = dappazon;

            if (!provider || !dappazon) {
                localProvider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(localProvider);

                const network = await localProvider.getNetwork();
                localContract = new ethers.Contract(
                    config[network.chainId].dappazon.address,
                    Dappazon,
                    localProvider
                );
                setDappazon(localContract);
            }

            await loadItems(localContract); // Sau khi loadItems thì useEffect sẽ tiếp tục
        } catch (error) {
            console.error("Lỗi khi load đơn hàng:", error);
            notification.error({ message: "Lỗi khi tải dữ liệu đơn hàng!" });
            setLoading(false);
        }
    };

    // Khi items đã load xong thì mới map đơn hàng
    useEffect(() => {
        const loadPurchases = async () => {
            if (!dappazon || Object.keys(items).length === 0) return;

            try {
                const [buyers, itemIds, quantities, times] = await dappazon.getAllPurchases();
                const formatted = buyers.map((buyer, i) => {
                    const itemData = items[itemIds[i].toString()] || {};
                    return {
                        key: i,
                        buyer,
                        itemName: itemData.name || `#${itemIds[i]}`,
                        image: itemData.image || "",
                        price: itemData.price || "",
                        quantity: quantities[i].toString(),
                        time: new Date(times[i].toNumber() * 1000).toLocaleString(),
                    };
                });
                setOrders(formatted);
            } catch (err) {
                notification.error({ message: "Không thể load đơn hàng." });
            } finally {
                setLoading(false);
            }
        };

        loadPurchases();
    }, [items, dappazon]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns = [
        { title: "👤 Người mua", dataIndex: "buyer", key: "buyer" },
        {
            title: "🖼️ Hình ảnh",
            dataIndex: "image",
            key: "image",
            render: (src) =>
                src ? (
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${src}`}
                        alt="product"
                        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                    />
                ) : (
                    "N/A"
                ),
        },
        { title: "🛍️ Sản phẩm", dataIndex: "itemName", key: "itemName" },
        { title: "💰 Giá", dataIndex: "price", key: "price" },
        { title: "🔢 Số lượng", dataIndex: "quantity", key: "quantity" },
        { title: "🕒 Thời gian", dataIndex: "time", key: "time" },
    ];

    return (
        <>
            <Header />
            <div className="mx-5">
                <h1 className="mt-4">Danh sách đơn đặt hàng</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <a href="/homeadmin">Trang chủ</a>
                    </li>
                    <li className="breadcrumb-item active">Đơn hàng</li>
                </ol>
            </div>
            <div className="container py-5">
                {loading ? (
                    <div className="text-center">
                        <Spin tip="Đang tải dữ liệu đơn hàng..." />
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={orders}
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                )}
            </div>
        </>

    );
};

export default OrderAdmin;
