
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
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
