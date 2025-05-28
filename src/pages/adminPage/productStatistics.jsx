import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/adminLayout/header";
import Footer from "../../components/layout/adminLayout/footer";
import SideBar from "../../components/layout/adminLayout/sidebar";
import { getProductStatistics } from "../../util/api";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
} from "recharts";
import { ethers } from "ethers";
import Dappazon from "../../../blockchain/abis/Dappazon.json";
import config from "../../config.json";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6E6E"];

const StatisticsProduct = () => {
    const [statistics, setStatistics] = useState(null);
    const [dailySummary, setDailySummary] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const data = await getProductStatistics();
                setStatistics(data);
            } catch (error) {
                console.error("Lỗi khi lấy thống kê sản phẩm:", error);
            }
        };

        const fetchOrders = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            const contract = new ethers.Contract(
                config[network.chainId].dappazon.address,
                Dappazon,
                provider
            );

            // Tạo map giá sản phẩm
            const itemPriceMap = {};
            let index = 1;
            while (true) {
                try {
                    const item = await contract.items(index);
                    if (item.seller === ethers.constants.AddressZero) break;
                    itemPriceMap[item.id.toString()] = item.price;
                    index++;
                } catch {
                    break;
                }
            }

            const [buyers, itemIds, quantities, times] = await contract.getAllPurchases();
            const summaryMap = {};

            for (let i = 0; i < buyers.length; i++) {
                const dateKey = new Date(times[i].toNumber() * 1000).toLocaleDateString("vi-VN");
                const quantity = parseInt(quantities[i].toString());
                const itemId = itemIds[i].toString();
                const price = itemPriceMap[itemId] ? Number(ethers.utils.formatEther(itemPriceMap[itemId])) : 0;

                if (!summaryMap[dateKey]) {
                    summaryMap[dateKey] = {
                        date: dateKey,
                        totalOrders: 0,
                        totalQuantity: 0,
                        totalRevenue: 0,
                    };
                }

                summaryMap[dateKey].totalOrders += 1;
                summaryMap[dateKey].totalQuantity += quantity;
                summaryMap[dateKey].totalRevenue += price * quantity;
            }

            setDailySummary(Object.values(summaryMap));
        };

        fetchStatistics();
        fetchOrders();
    }, []);

    const categoryData = statistics
        ? Object.entries(statistics.categoryCount).map(([category, count]) => ({
            name: category,
            value: count,
        }))
        : [];

    const categoryStockData = statistics && statistics.categoryStock
        ? Object.entries(statistics.categoryStock).map(([category, stock]) => ({
            name: category,
            value: stock,
        }))
        : [];

    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Thống kê sản phẩm</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item">
                                    <a href="/homeadmin">Trang chủ</a>
                                </li>
                                <li className="breadcrumb-item active">Thống kê</li>
                            </ol>

                            {statistics && (
                                <div className="row">
                                    <div className="col-xl-6 col-md-12">
                                        <div className="card mb-4" style={{ minHeight: "600px", width: "600px" }}>
                                            <div className="card-body" style={{ padding: "30px" }}>
                                                <h5 className="card-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
                                                    Sản phẩm theo danh mục
                                                </h5>
                                                <ResponsiveContainer width="100%" height={350}>
                                                    <PieChart>
                                                        <Pie
                                                            data={categoryData}
                                                            dataKey="value"
                                                            nameKey="name"
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={130}
                                                            label
                                                        >
                                                            {categoryData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                        <Legend />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-md-12">
                                        <div className="card mb-4" style={{ minHeight: "600px", width: "600px" }}>
                                            <div className="card-body" style={{ padding: "30px" }}>
                                                <h5 className="card-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
                                                    Số lượng sản phẩm trong kho
                                                </h5>
                                                <ResponsiveContainer width="100%" height={350}>
                                                    <PieChart>
                                                        <Pie
                                                            data={categoryStockData}
                                                            dataKey="value"
                                                            nameKey="name"
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={130}
                                                            label
                                                        >
                                                            {categoryStockData.map((entry, index) => (
                                                                <Cell key={`cell-stock-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                        <Legend />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Biểu đồ đơn hàng */}
                                    <div className="col-xl-12 col-md-12">
                                        <div className="card mb-4" style={{ minHeight: "500px" }}>
                                            <div className="card-body" style={{ padding: "30px" }}>
                                                <h5 className="card-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
                                                    Đơn hàng theo ngày
                                                </h5>
                                                <ResponsiveContainer width="100%" height={400}>
                                                    <BarChart data={dailySummary}>
                                                        <XAxis dataKey="date" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="totalOrders" fill="#8884d8" name="Đơn hàng" />
                                                        <Bar dataKey="totalRevenue" fill="#ffc658" name="Tổng doanh thu (ETH)" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StatisticsProduct;
