import React, { useContext, useState } from 'react';
import { CarTwoTone, HomeOutlined, OrderedListOutlined, SettingOutlined, ShoppingCartOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Card } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { ethers } from 'ethers';
import { updateAccount } from '../../util/api';

const { Header } = Layout;

const CustomHeader = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [current, setCurrent] = useState('home');

    const connectHandler = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    const addressMeta = ethers.utils.getAddress(accounts[0]);
                    if (auth.user.address === "") {
                        const res = await updateAccount(auth.user.email, addressMeta);
                        if (res) {
                            setAuth({
                                isAuthenticated: true,
                                user: {
                                    email: auth.user.email,
                                    name: auth.user.name,
                                    role: auth.user.role,
                                    address: addressMeta
                                }
                            });
                        } else {
                            alert("Có lỗi khi cập nhật địa chỉ ví. Vui lòng thử lại.");
                        }
                    }
                    console.log("Kết nối thành công với ví MetaMask:", addressMeta);
                }
            } catch (error) {
                console.error("Lỗi khi kết nối MetaMask:", error);
                alert("Có lỗi khi kết nối MetaMask. Vui lòng thử lại.");
            }
        } else {
            alert("Vui lòng cài đặt MetaMask!");
        }
    };

    const handleConnected = () => {
        alert(`Địa chỉ ví đã được kết nối: ${auth.user.address.slice(0, 6)}...${auth.user.address.slice(-4)}`);
    };

    const logout = () => {
        localStorage.clear("access_token");
        setAuth({
            isAuthenticated: false,
            user: {
                email: "",
                name: "",
                address: "",
                role: ""
            }
        });
        navigate("/");
    };

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const menuItems = [
        {
            label: <NavLink to={"/"}>Trang Chủ</NavLink>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(auth.isAuthenticated ? [{
            label: <NavLink to={"/order"}>Lịch sử mua hàng</NavLink>,
            key: 'order',
            // icon: <UsergroupAddOutlined />,
            icon: <OrderedListOutlined />,
        }] : []),
        ...(auth.user.address !== "" ? [{
            label: <Button type="link" onClick={handleConnected}>Đã kết nối ví: {auth.user.name}</Button>,
            key: 'wallet-connected',
            icon: <UsergroupAddOutlined />,
        }] : [{
            label: <Button type="primary" onClick={connectHandler}>Kết nối ví MetaMask</Button>,
            key: 'wallet-connect',
            icon: <UsergroupAddOutlined />,
        }]),
        {
            label: `Welcome ${auth.user.email || ""}`,
            key: 'user',
            icon: <SettingOutlined />,
            children: [
                ...(auth.isAuthenticated ? [{
                    label: <Button type="text" onClick={logout}>Đăng xuất</Button>,
                    key: 'logout',
                }] : [{
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login',
                }])
            ]
        },
        {
            label: <NavLink type="primary" to={"/cart"}>Cart</NavLink>,
            key: 'wallet-connect',
            icon: <ShoppingCartOutlined />,
        }
    ];

    return (
        <>
            <Header
                style={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 1000,
                    backgroundColor: '#f0f5ff',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    padding: '0 20px'
                }}
            >
                <div className="logo" style={{ fontWeight: 'bold', fontSize: 18, marginRight: '2rem' }}>
                    <Link to="/" style={{ color: '#1890ff' }}>MyShop</Link>
                </div>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={menuItems}
                    style={{ flex: 1, minWidth: 0, backgroundColor: 'transparent' }}
                />
            </Header>

            {/* Thêm khoảng trắng bên dưới header để tránh đè nội dung */}
            <div style={{ height: 64 }}></div>
        </>
    );
};

export default CustomHeader;
