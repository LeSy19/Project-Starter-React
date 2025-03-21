import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPages from './pages/login.jsx';
import UserPage from './pages/user.jsx';
import RegisterPages from './pages/register.jsx';
import ProductPage from './pages/product.jsx';
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/product",
        element: <ProductPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPages />
  },
  {
    path: "/register",
    element: <RegisterPages />
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
