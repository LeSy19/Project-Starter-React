import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import { useContext, useState } from "react";
import { CopyrightOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from "../context/auth.context";
const Header = () => {
    const [current, setCurrent] = useState('');

    const { user, setUser } = useContext(AuthContext);

    console.log(">>>Check context: ", { user, setUser })
    const onClick = (e) => {
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={"/companies"}>Company</Link>,
            key: 'companies',
            icon: <CopyrightOutlined />,

        },
        {
            label: 'Setting',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={"/login"}>Login</Link>,
                    key: 'login',
                    icon: <LoginOutlined />
                },
                {
                    label: <Link to={"/register"}>Register</Link>,
                    key: 'register',
                    icon: <LogoutOutlined />
                },
            ]
        }


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