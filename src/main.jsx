import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import {
  createBrowserRouter, RouterProvider,
} from "react-router-dom";
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import ErrorPage from './pages/error.jsx';
import HomeTest from './pages/home1.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Order from './pages/Oder.jsx';
import HomeAdmin from './pages/adminPage/homeAdmin.jsx';
import CreateProduct from './pages/adminPage/createProduct.jsx';
import ShowProduct from './pages/adminPage/showProduct.jsx';



let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeTest />
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "order",
        element: <Order />
      },
    ]
  },
  {
    path: "register",
    element: <RegisterPage />
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "homeadmin",
    element: <HomeAdmin />
  },
  {
    path: "createproduct",
    element: <CreateProduct />
  },
  {
    path: "showproduct",
    element: <ShowProduct />
  },


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>

  </React.StrictMode>,
)
