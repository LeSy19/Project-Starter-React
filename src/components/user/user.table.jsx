import React, { useState } from 'react';
import { Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import UserDetail from './user.detail';




const UserTable = (props) => {

    const { dataUser, loadUser, page, setPage, size, setSize, total } = props;

    const [dataDetailUser, setDataDetailUser] = useState(null);
    const [openDetailUser, setOpenDetailUser] = useState(false);

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
                            // setDataUpdate(record);
                            // setIsModalUpdateOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        // onConfirm={() => { handleDeleteUser(record.id) }}
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
        </>
    );

}
export default UserTable;