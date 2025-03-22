import { Button, Input, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.services";

const FormUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState();
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
    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
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
            <div style={{ marginTop: "10px" }}
                onClick={handleCreateUser}
            >
                <Button type="primary">Create User</Button>
            </div>
        </div>
    )
}

export default FormUser;