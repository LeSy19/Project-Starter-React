import { Button, Input } from "antd";
import { useState } from "react";
const FormUser = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    const handleCreateUser = () => {
        console.log(">>>Check form: ", { fullName, email, password, age, gender, address });
    }
    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                <div>
                    <span>Fullname</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
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