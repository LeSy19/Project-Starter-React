import React, { lazy, useEffect, useState } from 'react';
import { notification, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import UserDetail from './user.detail';
import { deleteUserAPI, fetchAllUserAPI } from '../../services/api.services';
import CreateUserForm from './user.create';
import CreateUserUncontrol from './user.create.uncontrol';
import UserUpdateControl from './user.update.control';
import UserUpdateUncontrol from './user.update.uncontrol';

const UserTable = () => {


    const [dataDetailUser, setDataDetailUser] = useState(null);
    const [openDetailUser, setOpenDetailUser] = useState(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [dataUpdateUser, setDataUpdateUser] = useState(null);

    const [dataUser, setDataUser] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadUser();
    }, [page, size])

    const loadUser = async () => {
        const res = await fetchAllUserAPI(page, size);
        console.log(">>check res: ", res.data)
        if (res.data) {
            setDataUser(res.data.result);
            setTotal(res.data.meta.total);
            setPage(res.data.meta.page); // Có thể đây là vấn đề
            setSize(res.data.meta.pageSize);


        }
    }

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Delete User Successfully",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
            await loadUser();
        } else {
            notification.error({
                message: "Delete User",
                description: JSON.stringify(res.message.message),
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });
        }
    }

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (page - 1) * size}</>
                );
            },
        },
        {
            title: 'ID',
            dataIndex: 'id',
            // render: text => <a>{text}</a>,
            render: (_, record) => {
                return (
                    <><a href="#">{record.id}</a></>
                )
            }
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

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataUpdateUser(record);
                            setIsOpenUpdate(true)
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this user?"
                        onConfirm={() => { handleDeleteUser(record.id) }}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>


                    <EyeOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataDetailUser(record)
                            setOpenDetailUser(true)
                        }}
                    />
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        //if change page
        if (pagination && pagination.current) {
            if (+pagination.current !== page) {
                setPage(+pagination.current)
            }
        }

        //if change size
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== size) {
                console.log(">>Check size đang cập nhật: ", +pagination.pageSize)
                setSize(pagination.pageSize)
            }
        }
    }

    return (
        <>
            <CreateUserUncontrol
                loadUser={loadUser}
                isOpenCreate={isOpenCreate}
                setIsOpenCreate={setIsOpenCreate}
            />
            {/* <CreateUserForm
                loadUser={loadUser}
                isOpenCreate={isOpenCreate}
                setIsOpenCreate={setIsOpenCreate}
            /> */}
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey="id"
                pagination={{
                    current: page,
                    pageSize: size,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                }}
                onChange={onChange}
            />

            <UserDetail
                openDetailUser={openDetailUser}
                setOpenDetailUser={setOpenDetailUser}
                dataDetailUser={dataDetailUser}
                setDataDetailUser={setDataDetailUser}
            />

            {/* <UserUpdateControl
                isOpenUpdate={isOpenUpdate}
                setIsOpenUpdate={setIsOpenUpdate}
                dataUpdateUser={dataUpdateUser}
                setDataUpdateUser={setDataUpdateUser}
                loadUser={loadUser}
            /> */}

            <UserUpdateUncontrol
                isOpenUpdate={isOpenUpdate}
                setIsOpenUpdate={setIsOpenUpdate}
                dataUpdateUser={dataUpdateUser}
                setDataUpdateUser={setDataUpdateUser}
                loadUser={loadUser}
            />
        </>
    );

}
export default UserTable;