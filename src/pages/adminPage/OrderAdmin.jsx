import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { Table, Spin, notification } from "antd";
import Dappazon from "../../../blockchain/abis/Dappazon.json";
import config from "../../config.json";
import { AuthContext } from "../../components/context/auth.context";

const OrderAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState({});
    const { provider, dappazon, setProvider, setDappazon } = useContext(AuthContext);

    const loadItems = async (contract) => {
        const itemMap = {};
        let index = 1;
        try {
            while (true) {
                const item = await contract.items(index);
                if (item.seller === ethers.constants.AddressZero) break;
                itemMap[item.id.toString()] = item.name;
                index++;
            }
        } catch (err) {
            console.log("Kết thúc load items", err);
        }
        setItems(itemMap);
    };

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

            await loadItems(localContract);

            const [buyers, itemIds, quantities, times] = await localContract.getAllPurchases();

            const formatted = buyers.map((buyer, i) => ({
                key: i,
                buyer,
                itemName: items[itemIds[i].toString()] || `#${itemIds[i]}`,
                quantity: quantities[i].toString(),
                time: new Date(times[i].toNumber() * 1000).toLocaleString(),
            }));

            setOrders(formatted);
        } catch (error) {
            console.error("Lỗi khi load đơn hàng:", error);
            notification.error({ message: "Lỗi khi tải dữ liệu đơn hàng!" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns = [
        { title: "👤 Người mua", dataIndex: "buyer", key: "buyer" },
        { title: "🛍️ Sản phẩm", dataIndex: "itemName", key: "itemName" },
        { title: "🔢 Số lượng", dataIndex: "quantity", key: "quantity" },
        { title: "🕒 Thời gian", dataIndex: "time", key: "time" },
    ];

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">📦 Danh sách tất cả đơn hàng</h2>
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
    );
};

export default OrderAdmin;
