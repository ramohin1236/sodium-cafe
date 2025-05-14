import React from 'react'
import { FaEdit, FaHome, FaPlus, FaQuestionCircle, FaShoppingBag, FaUsers } from 'react-icons/fa'
import { MdDashboardCustomize } from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom'

import { CiLogout } from 'react-icons/ci';
import {  FaLocationArrow } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';






const sharredLinks =(
    <>
       <li>
        <Link to='/'
        className='text-xl font-semibold mb-4 hover:text-button'
        >
        <FaHome/>  Home
            
        </Link>
        
    </li>
       <li>
        <Link to='/dashboard/order-tracking'
        className='text-xl font-semibold mb-4 hover:text-button'
        >
         <FaLocationArrow/> Orders Tracking
            
        </Link>
        
    </li>
       <li>
        <Link to='/menu'
        className='text-xl font-semibold mb-4 hover:text-button'
        >
         <FaQuestionCircle/> Customers Support
            
        </Link>
        
    </li>
       <li>
        <Link to='/menu'
        className='hover:text-button text-xl font-semibold '
        >
         <FaLocationArrow/> Question 
            
        </Link>
        
    </li>
    </>
)


const DashboardLayot = () => {

  
    const {logout,loading}=useAuth()

    const [isAdmin , isAdminLoading]=useAdmin()
    console.log("object",isAdmin);

 console.log(isAdmin);


  return (

    <div>
       
            {
             isAdmin ?  <div className="drawer lg:drawer-open">
             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
             <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2 ">
               {/* Page content here */}
           
           
                  <div>
                  <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><MdDashboardCustomize /></label>
                  </div>
           <div className='mt-5 md:mt-2 mx-4'>
               <Outlet/>
           </div>
              
             
             </div> 
             <div className="drawer-side">
               <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
               <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                 {/* Sidebar content here */}
           
                   <div className=' flex text-center items-center '>
                   <li>
                       <Link to="/" 
                       className='text-3xl font-bold text-center'
                       >
                           Foodie
                           
                       </Link>
                       
                   </li>
                   <div className="badge bg-button text-white font-bold px-4 py-3 mt-6">admin</div>
                   </div>
               <hr />
           
                 {/* <li><Link to='/dashboard' className='text-xl mt-8 text-black font-semibold hover:text-button'><MdDashboardCustomize /> Dashboard</Link></li> */}
                 
                 <li><Link to='/dashboard/users' className='text-xl  text-black font-semibold hover:text-button mt-4'><FaUsers /> All Users</Link></li>
                 {/* <li><Link to='/dashboard/users' className='text-xl  text-black font-semibold hover:text-button mt-4'><FaShoppingBag /> Manage Bookings</Link></li> */}


                 <li><Link to='/dashboard/add-menu' className='text-xl  text-black font-semibold hover:text-button mt-4'><FaPlus /> Add Menu</Link></li>
                 <li><Link to='/dashboard/manage-item' className='text-xl  text-black font-semibold hover:text-button mt-4'><FaEdit /> Manage Items</Link></li>
           
              <hr />
           {/* Sharrd links */}
           <div className='mt-12'>
           {
               sharredLinks
           }
           </div>
           
           
           
           
                 <li className='mt-12'><button  
                 onClick={()=>logout()}
                 className='text-xl  text-black font-semibold hover:text-button mt-4'><CiLogout /> Log out </button></li>
               </ul>
               
             </div>
           </div> : (<div className='text-center  my-16'><p className='text-6xl font-bold text-button'>You ar not an admin</p>
               <div className=''>
               <Link to='/menu' className='btn bg-button hover:bg-button-hvr text-bold  text-white 
                    px-12 py-2 text-xl mt-16
           '>Menu</Link>
               </div>
           </div>)
            }
         
        
    </div>
   
  )
}

export default DashboardLayot