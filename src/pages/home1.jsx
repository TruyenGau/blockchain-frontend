import "./css/style.css"
import "./css/bootstrap.min.css"
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import Dappazon from "../../blockchain/abis/Dappazon.json";
import config from "../config.json";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/layout/banner";
import Feature from "../components/layout/feature";
import Footer from "../components/layout/footer";
import { AuthContext } from "../components/context/auth.context";
import { getAllProduct } from "../util/api";
import { notification } from "antd";
import ChatBox from "./ChatBox";



const HomeTest = () => {
    const { auth, dappazon, setDappazon, provider, setProvider } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [countProduct, setCountProduct] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const getCartKey = () => `cart_${"lastWallet" || "guest"}`;


    const getCountProduct = async () => {
        const data = await getAllProduct();
        setCountProduct(data.length);
    };

    const loadBlockchainData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const network = await provider.getNetwork();

        const dappazon = new ethers.Contract(
            config[network.chainId].dappazon.address,
            Dappazon,
            provider
        );
        setDappazon(dappazon);

        const datafetch = [];
        for (var i = 0; i < 99; i++) {
            const item = await dappazon.items(i + 1);
            datafetch.push(item);
        }

        const filtered = datafetch.filter(item => item.stock > 0);
        setData(filtered);
        setFilteredData(filtered);
    };

    const handleBuyProduct = async (product) => {
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

        notification.success({
            message: "Mua sản phẩm thành công!",
            showProgress: true
        });
    };

    const handleAddToCart = (product) => {
        const stored = JSON.parse(localStorage.getItem(getCartKey()) || "[]");

        const exists = stored.find(p => p.id === product.id);
        let updated;

        const cleanProduct = {
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            quantity: 1,
            image: product.image,
        };

        if (exists) {
            updated = stored.map(p =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            );
        } else {
            updated = [...stored, cleanProduct];
        }

        localStorage.setItem(getCartKey(), JSON.stringify(updated));
        notification.success({ message: "Đã thêm vào giỏ hàng!" });
    };




    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data.filter((product) =>
            product.name.toLowerCase().includes(query) ||
            product.shortDesc.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    useEffect(() => {
        getCountProduct();
    }, []);

    useEffect(() => {
        if (countProduct > 0) {
            loadBlockchainData();
        }
    }, [countProduct]);

    return (
        <>
            <Banner />
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1>Sản phẩm nổi bật</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill active" href="/products"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Tìm sản phẩm..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {filteredData.map((product) => (
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
                                                                <button
                                                                    onClick={() => handleBuyProduct(product)}
                                                                    className="mx-auto btn border border-secondary rounded-pill px-3 text-primary"
                                                                >
                                                                    <i className="fa fa-shopping-bag me-2 text-primary"></i>
                                                                    Mua ngay
                                                                </button>
                                                                <button
                                                                    onClick={() => handleAddToCart(product)}
                                                                    className="mx-auto btn border border-success rounded-pill px-3 text-success mt-2"
                                                                >
                                                                    <i className="fa fa-cart-plus me-2 text-success"></i>
                                                                    Thêm vào giỏ
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Feature />
            <ChatBox />
        </>
    );
};

export default HomeTest;
