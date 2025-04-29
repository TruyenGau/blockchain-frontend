import React, { useContext } from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { loginApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const naviGate = useNavigate();
    const [form] = Form.useForm();
    const { setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {

        const { email, password } = values;
        const res = await loginApi(email, password);
        console.log("response", res);

        if (res && res.EC === 0 && res.user.role === "user") {
            localStorage.setItem("access_token", res.access_token);
            notification.success({
                message: "Người dùng đăng nhập thành công",
                description: "success",
                showProgress: true
            })
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? "",
                    name: res?.user?.name ?? "",
                    address: res?.user?.address ?? "",
                    role: res?.user?.role ?? ""
                }
            })
            naviGate("/");
        } else if (res && res.EC === 0 && res.user.role === "admin") {
            localStorage.setItem("access_token", res.access_token);
            notification.success({
                message: "Đăng nhập admin thành công",
                showProgress: true
            })
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? "",
                    name: res?.user?.name ?? "",
                    address: res?.user?.address ?? "",
                    role: res?.user?.role ?? ""
                }
            })
            naviGate("/homeadmin");
        }
        else {
            notification.error({
                message: "Login user error",
                description: res?.EM ?? "error"
            })
        }
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link></div>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage