import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/adminLayout/header";
import Footer from "../../components/layout/adminLayout/footer";
import SideBar from "../../components/layout/adminLayout/sidebar";
import { getCountProduct, getCountUser, getProductStatistics } from "../../util/api";




const HomeAdmin = () => {
    const [countUser, setCountUser] = useState(0);
    const [countProduct, setCountProduct] = useState(0);
    const [statistics, setStatistics] = useState(null);

    const getCount = async () => {
        const dataUser = await getCountUser();
        setCountUser(dataUser.data);
        const dataProduct = await getCountProduct();
        setCountProduct(dataProduct.data);
    }


    useEffect(() => {
        getCount();
    }, []);


    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4 text-primary">Trang chủ</h1>
                            <div className="row">
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-body text-center" style={{ fontSize: "30px" }}>
                                            Số lượng User: {countUser}
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/showUser">Xem chi tiết</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-danger text-white mb-4">
                                        <div className="card-body text-center" style={{ fontSize: "27px" }}>
                                            Quản lý sản phẩm: {countProduct}
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/showproduct">Xem chi tiết</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-info text-white mb-4">
                                        <div className="card-body text-center" style={{ fontSize: "27px" }}>
                                            Thống kê sản phẩm{statistics && `: ${statistics.totalProducts}`}
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/productStatistics">Xem chi tiết</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                    <div className="card  text-white mb-4 bg-success">
                                        <div className="card-body text-center" style={{ fontSize: "27px" }}>
                                            Đơn đặt hàng
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/orderAdmin">Xem chi tiết</Link>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;
