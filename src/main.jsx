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
import DetailProduct from './pages/adminPage/detailProduct.jsx';
import UpdateProduct from './pages/adminPage/updateProduct.jsx';
import ShowUser from './pages/adminPage/showUser.jsx';
import DetailUser from './pages/adminPage/detailUser.jsx';
import UpdateUser from './pages/adminPage/updateUser.jsx';
import CreateUser from './pages/adminPage/createUser.jsx';
import Cart from './pages/Cart.jsx';
import ProductStatistics from './pages/adminPage/productStatistics.jsx';
import OrderAdmin from './pages/adminPage/OrderAdmin.jsx';









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
      {
        path: "/cart",
        element: <Cart />
      }
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
  {
    path: "getProductDetail/:id",
    element: <DetailProduct />
  },
  {
    path: "updateProduct/:id",
    element: <UpdateProduct />
  },

  {
    path: "showUser",  // Đường dẫn tới ShowUser
    element: <ShowUser />
  },

  {
    path: "detailuser/:id",  // Đường dẫn tới chi tiết người dùng
    element: <DetailUser />
  },

  {
    path: "/updateUser/:id",
    element: <UpdateUser />
  },

  {
    path: "/createUser",
    element: <CreateUser />
  },

  {
    path: "/productStatistics",
    element: <ProductStatistics />
  },
  {
    path: "/orderAdmin",
    element: <OrderAdmin />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>

  </React.StrictMode>,
)
