import React from 'react';
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import '../App.css';
const MainLayout = () => {
    return (
        <div>
           <Navbar/>
            <Outlet />
            <p>footer</p>
        </div>
    );
};

export default MainLayout;