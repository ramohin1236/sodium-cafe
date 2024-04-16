import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Profile = () => {
    const {user,logout}=useAuth();

    const handleLogOut=()=>{
        logout()
    }

   



    return (
        <div>
        <div className="drawer drawer-end z-50">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button btn btn-circle avatar">
    <div className="w-10 rounded-full">
         {
            user?.photoURL? <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />: <div className="text-center ml-2 mb-6"><FaUser className="text-2xl"/></div>
         }
        </div>

    </label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><Link to='/update-profile'>Profile</Link></li>
      <li><Link to='/order'>Orders</Link></li>

         <li><Link to='/dashboard'>Dashboard</Link></li>
   
    
  
      <button
        onClick={handleLogOut}
        className='btn btn-sm bg-button hover:bg-button-hvr hover:text-white font-bold'>Logout</button>
    </ul>
  </div>
</div>
        </div>
    );
};

export default Profile;