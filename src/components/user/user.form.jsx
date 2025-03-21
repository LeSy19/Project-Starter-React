import { Button, Input } from "antd";
import { useState } from "react";
import axios from "axios";

const FormUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    const handleCreateUser = () => {
        const URL_BACKEND = "http://localhost:8080/api/v1/users";
        const data = {
            name: name,
            email: email,
            password: password,
            age: age,
            gender: gender,
            address: address
        }
        axios.post(URL_BACKEND, data)
        console.log(">>>Check form: ", { name, email, password, age, gender, address });
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