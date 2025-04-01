import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createCompanyAPI } from "../../services/api.services";

const FormCompany = (props) => {
    const { loadCompany } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateUser = async () => {

        const res = await createCompanyAPI(name, description, address);
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Create User Successfully",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
            resetAndCloseModal();
            await loadCompany(); //dùng await vì bên user dùng async
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
                        <span>Address</span>
                        <Input
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Description</span>
                        <Input
                            value={description}
                            onChange={(event) => { setDescription(event.target.value) }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default FormCompany;