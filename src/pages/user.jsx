import { use, useEffect, useState } from "react";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from "../services/api.services";

const UserPage = () => {

    // const [dataUser, setDataUser] = useState([]);
    // const [page, setPage] = useState(1);
    // const [size, setSize] = useState(4);
    // const [total, setTotal] = useState(0);

    // useEffect(() => {
    //     loadUser();
    // }, [page, size])

    // const loadUser = async () => {
    //     const res = await fetchAllUserAPI(page, size);
    //     console.log(">>check res: ", res.data)
    //     if (res.data) {
    //         setDataUser(res.data.result);
    //         setTotal(res.data.meta.total);
    //         setPage(res.data.meta.page); // Có thể đây là vấn đề
    //         setSize(res.data.meta.pageSize);


    //     }
    // }

    return (
        <>
            <div style={{ padding: "30px" }}>
                <UserTable
                // dataUser={dataUser}
                // loadUser={dataUser}
                // page={page}
                // setPage={setPage}
                // size={size}
                // setSize={setSize}
                // total={total}

                />
            </div>
        </>
    )
}
export default UserPage;