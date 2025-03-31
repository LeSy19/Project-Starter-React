import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { notification, Pagination, Popconfirm, Table, Tag } from 'antd';
import { useState } from 'react';
import UpdateCompanyModal from './update.company.modal';
import CompanyDetail from './company.detail';
import { deleteCompanyAPI } from '../../services/api.services';

const UserTable = (props) => {

    const { dataCompanies, loadUser,
        page, size, total,
        setPage, setSize
    } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleDeleteUser = async (id) => {
        const res = await deleteCompanyAPI(id);
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
            render: (_, record) => {
                return (
                    <a href='#'>{record.id}</a>
                );
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },

        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text) => text.length > 20 ? `${text.substring(0, 20)}...` : text
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { handleDeleteUser(record.id) }}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>


                    <EyeOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    />
                </div>
            ),
        },

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        //nếu thay đổi trang
        if (pagination && pagination.page) {
            // dấu "+" convert từ string => int
            if (+pagination.current !== +page) {
                setPage(+pagination.current);
            }
        }

        //nếu thay đổi tổng số phần tử
        if (pagination && pagination.size) {
            // dấu "+" convert từ string => int
            if (+pagination.pageSize !== +size) {
                setSize(+pagination.pageSize);
            }
        }
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataCompanies}
                rowKey="id"
                pagination={
                    {
                        page: page,
                        size: size,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <UpdateCompanyModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <CompanyDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadUser={loadUser}
            />
        </>
    )
}
export default UserTable;