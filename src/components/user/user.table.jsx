
import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.services';
import { useEffect, useState } from 'react';
const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([
        { id: 12, name: "sy", email: "ád@gmail.com", age: 12, gender: "MALE", address: "q12" },
        { id: 4, name: "syle", email: "ádád@gmail.com", age: 12, gender: "MALE", address: "q12" },
    ]);

    useEffect(() => {
        console.log(">>>run effect")
        loadUser();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },

    ];

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    }



    return (
        <Table
            columns={columns}
            dataSource={dataUsers}
            rowKey="id"
        />
    )
}
export default UserTable;