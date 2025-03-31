import { Button, Input, Form, Radio, InputNumber, notification, Row, Col } from "antd";
import { registerUserAPI } from "../../services/api.services";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(">>>Check values: ", values)
        //call api
        const res = await registerUserAPI(
            values.name,
            values.email,
            values.password,
            values.age,
            values.gender,
            values.address);

        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Đăng ký người dùng thành công",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Register User",
                description: JSON.stringify(res.message),
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
        }
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ margin: "10px" }}
            // onFinishFailed={onFinishFailed}
            >


                <Row justify={"center"}>
                    <Col xs={24} md={9}>

                        <Form.Item
                            label="Fullname"
                            name="name"
                            rules={[{
                                required: true,
                                message: 'Please input your fullname!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={9}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please input your email!'
                            }]}
                        >
                            <Input />
                        </Form.Item>

                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={9}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your password!'
                            }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={9}>
                        <Form.Item
                            label="Age"
                            name="age"
                            rules={[{
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={9}>
                        <Form.Item label="Gender" name="gender"
                            rules={[
                                { required: true, message: 'Please select your gender!' }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="MALE" > Male </Radio>
                                <Radio value="FEMALE"> Female </Radio>
                                <Radio value="OTHER"> Other </Radio>
                            </Radio.Group>
                        </Form.Item>

                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={9}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{
                                required: true,
                                message: 'Please input your address!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"} align="middle" style={{ flexDirection: "column", gap: "20px", width: "100%" }}>
                    <Col xs={24} md={9}>
                        <Button type="primary"
                            style={{
                                width: "100%",
                                padding: 10,
                                borderRadius: 6,
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                            onClick={() => form.submit()}
                        >Register</Button>
                    </Col>
                    <Col xs={24} md={9}>
                        <Link to="/login">Đã có tài khoản</Link>
                    </Col>
                </Row>




            </Form>
        </>

    );
}
export default Register;