import React from 'react';
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import '../App.css';
import Footer from '../components/Footer/Footer';
const MainLayout = () => {
    return (
        <div>
           <Navbar/>
           <div className='min-h-screen'>
                <Outlet />
           </div>
            
          <Footer/>
        </div>
    );
};

export default MainLayout;