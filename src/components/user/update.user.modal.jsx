import { Button, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateCompanyAPI } from "../../services/api.services";
const UpdateCompanyModal = (props) => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate.id);
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setAddress(dataUpdate.address);
        }
    }, [dataUpdate]);

    const handleUpdateUser = async () => {

        const res = await updateCompanyAPI(id, name, description, address);
        if (res.data) {
            notification.success({
                message: "Update User",
                description: "Update User Successfully",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "UPdate User",
                description: JSON.stringify(res.message.message),
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setName("");
        setDescription("");
        setAddress("");
        setDataUpdate(null)
    }

    return (
        <Modal
            title="Update user"
            open={isModalUpdateOpen}
            onOk={() => handleUpdateUser()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
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
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
}
export default UpdateCompanyModal;