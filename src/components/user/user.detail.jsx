import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const UserDetail = (props) => {
    const { openDetailUser, setOpenDetailUser, dataDetailUser, setDataDetailUser } = props;
    console.log(">>>>Check props: ", dataDetailUser)
    return (
        <>
            <Drawer title="Detail User"
                width={"40vw"}
                onClose={() => {
                    setDataDetailUser(null)
                    setOpenDetailUser(false)
                }}
                open={openDetailUser}>

                {dataDetailUser ?
                    <>
                        <p>Id: {dataDetailUser.id}</p>
                        <p>Name: {dataDetailUser.name}</p>
                        <p>Email: {dataDetailUser.email}</p>
                        <p>Age: {dataDetailUser.age}</p>
                        <p>Gender: {dataDetailUser.gender}</p>
                        <p>Address: {dataDetailUser.address}</p>
                        {dataDetailUser.role ?
                            <p>Role: {dataDetailUser.role.name}</p>
                            :
                            <>
                                <p>Role: USER</p>
                            </>
                        }
                    </>
                    : <>
                        <p>Khong co du lieu</p>
                    </>

                }

                {/* {dataDetailUser.role ?
                    <p>Role: {dataDetailUser.role.name}</p>
                    : ""
                } */}

            </Drawer>
        </>
    )
}

export default UserDetail;