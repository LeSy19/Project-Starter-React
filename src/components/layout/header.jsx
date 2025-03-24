import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import { useState } from "react";
import { CopyrightOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        console.log('click ', e);
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