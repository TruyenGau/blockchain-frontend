import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { name, email, password, confirmPassword } = values;
        const res = await createUserApi(name, email, password, confirmPassword);
        if (res) {
            notification.success({
                message: "Tạo tài khoản thành công",
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Tạo tài khoản thất bại",
                description: "Vui lòng thử lại!",
            });
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #e0f2fe, #f0f9ff)',
            padding: '20px'
        }}>
            <div style={{
                background: '#fff',
                padding: '50px',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '480px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <UserAddOutlined style={{ fontSize: 40, color: '#22c55e' }} />
                <h2 style={{ marginTop: 16, fontWeight: 600 }}>Đăng ký tài khoản</h2>
                <p style={{ color: '#666', marginBottom: 30 }}>Tạo tài khoản mới để bắt đầu mua sắm</p>

                <Form
                    form={form}
                    layout="vertical"
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
                        label="Tên"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input size="large" placeholder="Tên của bạn" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password size="large" placeholder="********" />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
                    >
                        <Input.Password size="large" placeholder="********" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>

                <p style={{ marginTop: 20 }}>
                    Đã có tài khoản? <Link to="/login" style={{ color: '#1d4ed8', fontWeight: 500 }}>Đăng nhập tại đây</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
