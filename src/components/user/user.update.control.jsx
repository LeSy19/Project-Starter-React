import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.services";


const UserUpdateControl = (props) => {
    const { isOpenUpdate, setIsOpenUpdate, dataUpdateUser, setDataUpdateUser, loadUser } = props;

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");


    useEffect(() => {
        if (dataUpdateUser) {
            setId(dataUpdateUser.id);
            setName(dataUpdateUser.name);
            setAge(dataUpdateUser.age);
            setGender(dataUpdateUser.gender);
            setAddress(dataUpdateUser.address);
        }
    }, [dataUpdateUser])

    const handleUpdateUser = async () => {
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
        setId("");
        setName("");
        setAge("");
        setGender("");
        setAddress("")
    }

    return (
        <div>
            <Modal
                title="Update User"
                open={isOpenUpdate}
                onCancel={() => handleCloseAndResetModal()}
                onOk={handleUpdateUser}
                okText="CREATE"
                cancelText="CANCEL"
                maskClosable={false}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                        <label >Id</label>
                        <Input value={id} disabled />
                    </div>
                    <div>
                        <label >Name</label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
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
                            value={gender}
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
    )
}
export default UserUpdateControl;