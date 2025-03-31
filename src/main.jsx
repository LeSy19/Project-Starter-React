import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPages from './pages/login.jsx';
import CompanyPage from './pages/user.jsx';
import RegisterPages from './pages/register.jsx';
import UserPage from './pages/company.jsx';
import "./styles/global.css";
import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './pages/error.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />
      },
      {
        path: "/users",
        element: <CompanyPage />
      },
      {
        path: "/companies",
        element: <UserPage />
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
  <AuthWrapper>
    {/* <StrictMode> */}
    {/* <App /> */}
    <RouterProvider router={router} />
    {/* </StrictMode>, */}
  </AuthWrapper>
)
