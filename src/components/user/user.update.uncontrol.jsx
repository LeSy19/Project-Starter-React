import { useEffect } from "react";
import { updateUserAPI } from "../../services/api.services";
import { Form, Input, InputNumber, Modal, notification, Select } from "antd";


const UserUpdateUncontrol = (props) => {
    const { isOpenUpdate, setIsOpenUpdate, dataUpdateUser, setDataUpdateUser, loadUser } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdateUser && dataUpdateUser.id) {
            form.setFieldsValue({
                id: dataUpdateUser.id,
                name: dataUpdateUser.name,
                age: dataUpdateUser.age,
                gender: dataUpdateUser.gender,
                address: dataUpdateUser.address
            });
        }
    }, [dataUpdateUser])
    const handleUpdateUser = async (values) => {
        const { id, name, age, gender, address } = values;
        const res = await updateUserAPI(id, name, age, gender, address);
        if (res.data) {
            notification.success({
                message: "Update User",
                description: "Update User Successfully",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
            handleCloseAndResetModal();
            await loadUser();
        } else {
            notification.error({
                message: "Update User",
                description: JSON.stringify(res.message),
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
        }
    }

    const handleCloseAndResetModal = () => {
        setIsOpenUpdate(false);
        form.resetFields();
    }
    return (
        <Modal
            title="Update User"
            open={isOpenUpdate}
            onCancel={() => handleCloseAndResetModal()}
            onOk={() => form.submit()}
            okText="SAVE"
            cancelText="CANCEL"
            maskClosable={false}
        >
            <Form
                form={form}
                onFinish={handleUpdateUser}
                layout='vertical'
            // onFinishFailed={onFinishFailed}

            >
                <Form.Item
                    label="ID"
                    name="id"

                >
                    <Input />
                </Form.Item>
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
    )
}
export default UserUpdateUncontrol;