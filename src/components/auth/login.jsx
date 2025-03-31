import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, Card, Row, Col, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAPI } from '../../services/api.services';
import { AuthContext } from '../context/auth.context';

const LoginForm = () => {
    // const [form] = Form.useForm();
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        const res = await loginUserAPI(values.email, values.password);
        if (res.data) {
            notification.success({
                message: "Login User",
                description: "Đăng nhập thành công",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        } else {
            notification.error({
                message: "Register User",
                description: "Sai thông tin đăng nhập",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
        }
    }

    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
            <Col xs={24} sm={18} md={12} lg={9}>
                <Form
                    name="LOGIN"
                    layout='vertical'
                    // form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{
                        padding: 40,
                        borderRadius: 8,
                        background: "#fff",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "The input is not a valid E-mail!" },
                        ]}
                    >
                        <Input style={{ borderRadius: 6 }} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password style={{ borderRadius: 6 }} />
                    </Form.Item>

                    <Row justify="space-between" >
                        <Col>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Link to="/register" style={{ color: "#1890ff" }}>
                                Chưa có tài khoản
                            </Link>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: "100%",
                                padding: 10,
                                borderRadius: 6,
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}

                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );

}
export default LoginForm;