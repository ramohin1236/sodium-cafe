import React from 'react';
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import '../App.css';
import SpecialDishes from '../Pages/Home/SpecialDishes';
const MainLayout = () => {
    return (
        <div>
           <Navbar/>
            <Outlet />
            <SpecialDishes/>
        </div>
    );
};

export default MainLayout;