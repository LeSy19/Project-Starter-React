import FormUser from "../components/user/user.form";
import UserTable from "../components/user/user.table";


const UserPage = () => {
    return (
        <div style={{ padding: "20px" }}>
            <FormUser />
            <UserTable />
        </div>
    )
}


export default UserPage;