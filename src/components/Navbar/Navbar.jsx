import React, {  useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Modal from '../Modal';
import Profile from '../Profile';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const {user,logout}=useAuth()
  console.log(user);
    const [sticky, setSticky,  ]=useState(false)
    // hoook
    const [cart,refetch]=useCart()
    console.log("cartt",cart);

    // handle scroll functionn
    useEffect(()=>{
        const handleScroll=()=>{
            const offset= window.scrollY;
            if(offset>0){
                setSticky(true)
            }
            else{
                setSticky(false)
            }
        }

        window.addEventListener("scroll",handleScroll)
        return()=>{
            window.addEventListener("scroll",handleScroll)
        }
       
    },[])

    const handleLogOut=()=>{
        logout()
    }

    const navItems =<>
     <li className='mx-4'><NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "text-black" : isActive ? "bg-button text-white font-bold hover:text-black" : ""
  }
>
Home
</NavLink></li>
      <li className='mx-4'>
      <NavLink
  to="/menu"
  className={({ isActive, isPending }) =>
    isPending ? "text-black" : isActive ? "bg-button text-white font-bold hover:text-black" : ""
  }
>
Menu
</NavLink>
      </li>
      <li className='mx-4'>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li><a>Online Oreder</a></li>
            <li><a>Table Booking</a></li>
            <li><a>Order Tracking</a></li>
          </ul>
        </details>
      </li>
      <li className='mx-4'><a>Offers</a></li>
    </>


    return (
        <header className=' fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out'>
            <div className={` navbar xl:px-24 ${sticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out":""}`}>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navItems}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {/* nav item */}
     {navItems}
    </ul>
  </div>
  <div className="navbar-end">
    {/* search items */}
    <button className="btn btn-ghost btn-circle mr-8 hidden md:block">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
{/* cart items */}

   <Link to='/cart-page'>
   <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-6 flex items-center justify-center">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item text-button font-bold ">{cart.length}</span>
        </div>
      </div>
   </Link>
      

     

    {
        user?<Profile user={user}/>: <button
        onClick={()=>document.getElementById('my_modal_5').showModal()}
       className="btn text-xl
       rounded-full px-8 flex text-center text-white font-bold
       bg-button hover:bg-button-hvr"><FaRegUser className='text-xl font-bold'/> Login</button>
    }
    {/* modal body */}
    <Modal/>
  </div>
</div>
        </header>
    );
};

export default Navbar;