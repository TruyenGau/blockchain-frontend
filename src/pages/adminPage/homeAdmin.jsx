import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
// import "./css/admin.css"
import Header from "../../components/layout/adminLayout/header";
import Footer from "../../components/layout/adminLayout/footer";
import SideBar from "../../components/layout/adminLayout/sidebar";
import { getCountProduct, getCountUser } from "../../util/api";

const HomeAdmin = () => {
    const [countUser, setCountUser] = useState(0);
    const [countProduct, setCountProduct] = useState(0);

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
                            <h1 className="mt-4 text-primary" >Trang chủ</h1>
                            <ol className="breadcrumb mb-4">
                                {/* <li className="breadcrumb-item active">Thống kê</li> */}
                            </ol>
                            <div className="row">
                                <div className="col-xl-4 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-body" style={{ fontSize: "30px", alignContent: "center", alignItems: 'center' }}> Số lượng User: {countUser}</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/showUser">Xem chi tiết</Link>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="card bg-danger text-white mb-4">
                                        <div className="card-body" style={{ fontSize: "27px", alignContent: "center", alignItems: 'center' }}>Quản lý sản phẩm</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/showproduct">Xem chi tiết</Link>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="card bg-success text-white mb-4">
                                        <div className="card-body">Số lượng Order</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/admin/order">Xem chi tiết</Link>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* <Footer />  */}
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;
