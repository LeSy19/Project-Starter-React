
import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { createUserAPI } from "../../services/api.services";

const CreateUserForm = (props) => {

    const { loadUser, isOpenCreate, setIsOpenCreate } = props;



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    const handleCreateUser = async () => {
        const res = await createUserAPI(name, email, password, age, gender, address);
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Create User Successfully",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
            handleCloseAndResetModal();
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
    }

    const handleCloseAndResetModal = () => {
        setIsOpenCreate(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("")
    }

    return (
        <>
            <div style={{ margin: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Users</h3>
                    <Button
                        type="primary"
                        onClick={() => setIsOpenCreate(true)}
                    >Create User</Button>
                </div>
                <Modal
                    title="Create User"
                    open={isOpenCreate}
                    onCancel={() => setIsOpenCreate(false)}
                    onOk={handleCreateUser}
                    okText="CREATE"
                    cancelText="CANCEL"
                    maskClosable={false}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div>
                            <label >Name</label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div >
                            <label >Email</label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div >
                            <label >Password</label>
                            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div >
                            <label >Age</label>
                            <InputNumber
                                min="1" max="100"
                                value={age}
                                onChange={setAge} style={{ width: "100%" }} />
                        </div>
                        <div >
                            <label >Gender</label>
                            <Select
                                // defaultValue="lucy"
                                style={{ width: "100%" }}
                                onChange={(e) => { setGender(e) }}
                                options={[
                                    { value: 'MALE', label: 'Male' },
                                    { value: 'FEMALE', label: 'Female' },
                                    { value: 'OTHER', label: 'Other' },
                                ]}
                            />
                        </div>
                        <div >
                            <label >Address</label>
                            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default CreateUserForm;