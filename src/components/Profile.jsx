import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FaUser } from "react-icons/fa";

const Profile = () => {
    const {user,logout}=useContext(AuthContext);
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
            user?.photoURL? <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />: <FaUser/>
         }
        </div>

    </label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li><a>Setting</a></li>
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