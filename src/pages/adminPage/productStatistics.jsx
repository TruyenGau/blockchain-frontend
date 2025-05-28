import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/adminLayout/header";
import Footer from "../../components/layout/adminLayout/footer";
import SideBar from "../../components/layout/adminLayout/sidebar";
import { getCountProduct, getCountUser, getProductStatistics } from "../../util/api";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6E6E"];
;

const StatisticsProduct = () => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const data = await getProductStatistics();
                console.log("Kết quả thống kê:", data);
                setStatistics(data);
            } catch (error) {
                console.error("Lỗi khi lấy thống kê sản phẩm:", error);
            }
        };

        fetchStatistics();
    }, []);

    // Xử lý dữ liệu
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
                                    {/* Biểu đồ sản phẩm theo danh mục */}
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

                                    {/* Biểu đồ tồn kho theo danh mục */}
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
