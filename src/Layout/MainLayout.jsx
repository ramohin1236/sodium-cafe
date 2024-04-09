import React, { useContext } from 'react';
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import '../App.css';
import Footer from '../components/Footer/Footer';
import { AuthContext } from '../Context/AuthProvider';
import Loading from '../components/Loading';
const MainLayout = () => {
    const {loading}=useContext(AuthContext)
    return (
        <div>

    {loading ? <Loading/> :<div>
            <Navbar/>
               <Outlet />
             <Footer/>
          </div> }

          
        </div>
    );
};

export default MainLayout;