import FormUser from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllCompanyAPI } from '../services/api.services';
import { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        const res = await fetchAllCompanyAPI();
        setDataUsers(res.data.result);
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