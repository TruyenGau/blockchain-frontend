import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const naviGate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async (values) => {

        const { name, email, password, confirmPassword } = values;
        const res = await createUserApi(name, email, password, confirmPassword);
        console.log("response", res);
        if (res) {
            notification.success({
                message: "Tạo tài khoản thành công",
                showProgress: true
            })
            naviGate("/login");
        } else {
            notification.error({
                message: "Create user error",
                description: "error"
            })
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "10px" }}
        >
            <h3 style={{ textAlign: "center" }}>Đăng ký tài khoản</h3>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
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
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
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
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="confirmPassword"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your confirmPassword!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button onClick={
                            () => { form.submit() }
                        } type="primary">Register</Button>
                    </div>
                    <Divider />
                    <div>Đã có tài khoản? <Link to={"/login"}> Đăng nhập tại đây</Link></div>
                </Col>
            </Row>
        </Form>
    )
}

export default RegisterPage