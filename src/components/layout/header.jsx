import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, notification } from "antd";
import { useContext, useState } from "react";
import { AliwangwangOutlined, CopyrightOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.services";
const Header = () => {
    const [current, setCurrent] = useState('');

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                id: "",
                email: "",
                name: "",
                role: ""
            })
            notification.success({
                message: "Logout",
                description: "Lougout success",
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            });

            //redirect to home
            navigate("/");
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>User</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={"/companies"}>Company</Link>,
            key: 'companies',
            icon: <CopyrightOutlined />,

        },
        ...(!user.id ? [{
            label: <Link to={"/login"}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),

        ...(user.id ? [{
            label: `Welcome ${user.name}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [

                {
                    label: <span onClick={() => handleLogout()}>Logout</span>,
                    key: 'register',
                    icon: <LogoutOutlined />
                },
            ]
        }] : []),




    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    );
}

export default Header;