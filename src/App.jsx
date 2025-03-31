
import {
  Outlet
} from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { getAccountAPI } from "./services/api.services";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
//arrow function = () => {}
const App = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      //success
      setUser(res.data.user);
    }
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
