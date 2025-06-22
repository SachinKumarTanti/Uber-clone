import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/Usercontext';
import avatar from '../assets/user-avatar.jpg'; // fallback avatar
import logo from '../assets/uber-user-logo.png';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const { user, setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const logout = async () => {
   // navigate('/user-logout');
     try {
    //     setuser(null);
        toast.success('Logged out successfully!');
         setTimeout(() => {navigate('/user-logout');}, 1000); 
     } catch (error) {
         toast.error('Logout failed. Please try again.');
     }
   
  };

  return (
    <nav className="w-full px-6 py-4 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-600 select-none">
        <i className="ri-steering-2-line text-3xl text-blue-500 animate-pulse"></i>
        <img src={`${logo}`} alt='uber-logo' className='w-20' />
      </div>

      {/* User Info + Logout */}
      {user && (
        <div className="flex items-center gap-4 transition-all duration-300">
          {/* Avatar */}
          <div className="flex items-center gap-2 group">
            <img
              src={user?.photo || avatar}
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-300 shadow-md object-cover transform group-hover:scale-105 transition duration-300"
            />
            <span className="text-gray-700 font-medium text-base group-hover:text-blue-600 transition duration-300">
              {user.fullname?.firstname || 'User'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
