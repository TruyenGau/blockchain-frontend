import React, { useContext, useEffect, useState } from 'react';
import { AppstoreOutlined, HomeOutlined, MailOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { ethers } from "ethers";
import axios from 'axios';
import { updateAccount } from '../../util/api';
import { use } from 'react';


const Header = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    console.log("auth", auth);
    const connectHandler = async () => {
        if (typeof window.ethereum !== 'undefined') {  // Kiểm tra xem MetaMask có được cài đặt không
            try {
                // Yêu cầu người dùng chọn tài khoản
                const accounts = await window.ethereum.request({
                    method: `eth_requestAccounts`,
                });
                // Kiểm tra nếu tài khoản được chọn
                if (accounts.length > 0) {
                    const addressMeta = ethers.utils.getAddress(accounts[0]);
                    if (auth.user.address === "") {
                        // Cập nhật thông tin địa chỉ ví vào backend (nếu cần)
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
                            })
                        } else {
                            alert("Có lỗi khi cập nhật địa chỉ ví. Vui lòng thử lại.");
                        }
                    }


                    // Có thể hiển thị thông báo hoặc log địa chỉ ví
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

    // const checkWalletConnection = async () => {
    //     const accounts = await window.ethereum.request({
    //         method: `eth_requestAccounts`,
    //     });
    //     const addressMeta = ethers.utils.getAddress(accounts[0]);
    //     if (auth.user.address === addressMeta) {
    //         // Nếu địa chỉ ví của người dùng trùng với ví MetaMask đang kết nối
    //         alert("Địa chỉ ví đã kết nối trùng với ví của người dùng: ", addressMeta);
    //     } else {
    //         alert("Địa chỉ ví MetaMask hiện tại không trùng với ví của người dùng!");
    //         return;
    //     }
    // }
    // useEffect(() => {
    //     checkWalletConnection();
    // }, [])

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
        })
        navigate("/");
    }


    const handleConnected = async () => {
        alert(`Địa chỉ ví đã được kết nối trước đó với tài khoản có địa chỉ ${auth.user.address.slice(0, 6) + "..." + auth.user.address.slice(38, 42)}`);
    }
    const items = [
        {
            label: <NavLink to={"/"}>Trang Chủ</NavLink>,
            key: 'home',
            icon: <HomeOutlined />,
        },

        ...(auth.isAuthenticated ? [{
            label: <NavLink to={"/order"}>Lịch sử mua hàng</NavLink>,
            key: 'user',
            icon: <UsergroupAddOutlined />,
        }] : []),


        ...(auth.user.address !== "" ? [{
            label: <button onClick={handleConnected}>Đã kết nối ví metamask: {auth.user.name}</button>,
            key: 'metamask',
            icon: <UsergroupAddOutlined />,
        }] : [{
            label: <button onClick={connectHandler} className='button'>Kết nối ví MetaMask</button>,
            key: 'metamask1',
            icon: <UsergroupAddOutlined />,
        }]),

        {
            label: `Welcome ${auth?.user?.email ?? ""}`,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                ...(auth.isAuthenticated ? [{
                    label: <button onClick={logout}>Đăng xuất</button>,
                    key: 'logout',
                }] : [{
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login'
                }]),
            ],


        },



    ];
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;