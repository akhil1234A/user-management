// Navbar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // To redirect on logout
import { logout } from '../slices/authSlice'; // Adjust this path based on your file structure

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use navigate hook for redirection

    const handleLogout = () => {
      // Dispatch the logout action from the auth slice
      dispatch(logout());
      
      // Clear token and role from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      
      // Optional: Display a success message using toast
      toast.success('Logged out successfully.');

      // Redirect to the login page
      navigate('/'); 
    };

    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2">
        <a className="navbar-brand" href="#">Admin Dashboard</a>

        <div className="d-flex justify-content-between w-100">
          {/* Empty space on the left */}
          <div className="navbar-nav mr-auto"></div>
          
          {/* Logout button aligned right */}
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      </>
    );
};

export default Navbar;
