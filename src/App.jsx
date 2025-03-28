
import {
  Outlet
} from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
//arrow function = () => {}
const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
