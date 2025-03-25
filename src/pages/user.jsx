import FormUser from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from '../services/api.services';
import { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    }


    return (
        <div style={{ padding: "20px" }}>
            <FormUser
                loadUser={loadUser}
            />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
            />
        </div>
    )
}


export default UserPage;