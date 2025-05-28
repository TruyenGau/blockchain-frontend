import React, { useContext } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { loginApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
import { LaptopOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await loginApi(email, password);

        if (res && res.EC === 0 && res.user.role === 'user') {
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('lastWallet', res.user.address); // ✅ Lưu ví người dùng
            notification.success({
                message: 'Người dùng đăng nhập thành công',
                description: 'success',
            });
            setAuth({ isAuthenticated: true, user: res.user });
            navigate('/');
        } else if (res && res.EC === 0 && res.user.role === 'admin') {
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('lastWallet', res.user.address); // ✅ Lưu ví admin
            notification.success({
                message: 'Đăng nhập admin thành công',
            });
            setAuth({ isAuthenticated: true, user: res.user });
            navigate('/homeadmin');
        } else {
            notification.error({
                message: 'Login user error',
                description: res?.EM ?? 'error'
            });
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #cfe9fd, #e9f7fd)',
            padding: '20px'
        }}>
            <div style={{
                background: '#ffffff',
                padding: '60px 50px',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '480px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                textAlign: 'center'
            }}>
                <LaptopOutlined style={{ fontSize: 40, color: '#1D4ED8' }} />
                <h2 style={{ marginTop: 16, fontWeight: 600 }}>Chào mừng trở lại 👋</h2>
                <p style={{ color: '#666', marginBottom: 30 }}>Đăng nhập để tiếp tục mua sắm laptop</p>

                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input size="large" placeholder="you@example.com" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password size="large" placeholder="********" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' }}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <p style={{ marginTop: 24 }}>
                    Bạn chưa có tài khoản? <Link to="/register" style={{ color: '#1D4ED8', fontWeight: 500 }}>Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
