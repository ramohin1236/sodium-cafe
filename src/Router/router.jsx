import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Shop/Menu";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile";


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
            path:"/update-profile",
            element:<UpdateProfile/>
        },
        
      ]
    },
    {
        path:"/signup",
        element:<Signup/>
    },
  ]);