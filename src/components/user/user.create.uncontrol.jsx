import { Button, Modal, Form, Input, notification, Layout, InputNumber, Select } from "antd";
import { createUserAPI } from "../../services/api.services";
import { useState } from "react";


const CreateUserUncontrol = (props) => {

    const { loadUser, isOpenCreate, setIsOpenCreate } = props;
    const [form] = Form.useForm();
    const [loadingCreate, setLoadingCreate] = useState(false);

    const handleCreate = async (values) => {
        setLoadingCreate(true);
        const { name, email, password, age, gender, address } = values;
        const res = await createUserAPI(name, email, password, age, gender, address);
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Create User Successfully",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Create User",
                description: JSON.stringify(res.message),
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
        }
        setLoadingCreate(false);
    }

    const resetAndCloseModal = () => {
        setIsOpenCreate(false);
        form.resetFields();
    }
    return (
        <>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Users</h3>
                    <Button
                        type="primary"
                        onClick={() => setIsOpenCreate(true)}
                    >Create User</Button>
                </div>
                <Modal title="CREATE USER(Uncontrol Component)"
                    open={isOpenCreate}
                    onOk={() => form.submit()}
                    okButtonProps={{
                        loading: loadingCreate
                    }}
                    onCancel={() => resetAndCloseModal()}
                    okText="CREATE"
                    maskClosable={false}
                >

                    <Form
                        form={form}
                        onFinish={handleCreate}
                        layout='vertical'
                    // onFinishFailed={onFinishFailed}

                    >
                        <Form.Item
                            label="Fullname"
                            name="name"
                            rules={[
                                {
                                    required: true, message: 'Please input your name!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "The input is not a valid E-mail!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true, message: 'Please input your password!'
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Age"
                            name="age"
                            rules={[
                                {
                                    required: true, message: 'Please input your age!'
                                }
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[
                                {
                                    required: true, message: 'Please input your gender!'
                                }
                            ]}
                        >
                            <Select
                                style={{ width: "100%" }}
                                options={[
                                    { value: 'MALE', label: 'Male' },
                                    { value: 'FEMALE', label: 'Female' },
                                    { value: 'OTHER', label: 'Other' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true, message: 'Please input your address!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>



                </Modal>

            </div>
        </>
    )


}
export default CreateUserUncontrol;