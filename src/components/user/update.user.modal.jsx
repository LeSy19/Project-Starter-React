import { Button, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, UpdateUserAPI } from "../../services/api.services";
const UpdateUserModal = (props) => {

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate.id);
            setName(dataUpdate.name);
            setAge(dataUpdate.age);
            setGender(dataUpdate.gender);
            setAddress(dataUpdate.address);
        }
    }, [dataUpdate]);

    const handleUpdateUser = async () => {

        const res = await UpdateUserAPI(id, name, age, gender, address);
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
        setAge("");
        setGender("");
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
    );
}
export default UpdateUserModal;