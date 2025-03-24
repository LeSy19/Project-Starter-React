import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.services";

const FormUser = (props) => {
    const { loadUser } = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

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
            resetAndCloseModal();
            await loadUser(); //dùng await vì bên user dùng async
        } else {
            notification.error({
                message: "Create User",
                description: JSON.stringify(res.message.message),
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
        }
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
    }
    return (
        <div className="user-form" style={{ margin: "20px 0" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    type="primary"
                    onClick={() => { setIsModalOpen(true) }}
                >Create User</Button>
            </div>
            <Modal
                title="Create user"
                open={isModalOpen}
                onOk={() => handleCreateUser()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Fullname</span>
                        <Input
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Age</span>
                        <Input
                            value={age}
                            onChange={(event) => setAge(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Gender</span>
                        <Input
                            value={gender}
                            onChange={(event) => setGender(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Address</span>
                        <Input
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default FormUser;