import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Shop/Menu";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile";
import CartPage from "../Pages/Cartpage/CartPage";
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import DashboardLayot from "../Layout/DashboardLayout/DashboardLayot";
import Dashboard from "../Pages/Dashboard/Admin/Dashboard";
import Users from "../Pages/Dashboard/Admin/Users";
import AddMenu from "../Pages/Dashboard/AddMenu";
import ManageItems from "../Pages/Dashboard/Admin/MannageItems";
import UpdateMenu from "../Pages/Dashboard/Admin/UpdateMenu";
import Payment from "../Pages/Payment/Payment";
import Order from "../Pages/Order";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/menu",
            element:<Menu/>
        },
        {
            path:"/order",
            element:<Order/>
        },
        {
            path:"/update-profile",
            element:<PrivateRoute><UpdateProfile/></PrivateRoute>
        },
        {
            path:"/cart-page",
            element:<PrivateRoute><CartPage/></PrivateRoute>
        },
        {
            path:"/process-chekout",
            element:<PrivateRoute><Payment/></PrivateRoute>
        },
        
      ]
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayot/>
        </PrivateRoute>,
        children:[
          {
            path:'',
            element: <Dashboard/>
          },
          {
            path:'users',
            element: <Users/>
          },
          {
            path:'add-menu',
            element: <AddMenu/>
          },
          {
            path:'manage-item',
            element: <ManageItems/>
          },
          {
            path:'update-menu/:id',
            element: <UpdateMenu/>,
            loader: ({params})=>fetch(`https://sodium-cafe-mongoose.onrender.com/menu/${params.id}`)
          },
        ]
    }
  ]);