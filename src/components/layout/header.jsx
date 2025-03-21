import "./header.css";
const Header = () => {
    return (
        <ul>
            <li><a className="active" href="/">Home</a></li>
            <li><a href="/user">Users</a></li>
            <li><a href="/product">Products</a></li>
        </ul>
    );
}

export default Header;