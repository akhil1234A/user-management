import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice'; // Logout now comes from authSlice
import { loadUserProfile } from '../../slices/userSlice'; // Moved to userSlice
import EditProfileModal from './EditProfileModal'; // Modal for editing profile
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Getting user profile and loading states from userSlice
  const { profile, loading } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.auth); // Check authentication status from authSlice
  
  const [isModalOpen, setModalOpen] = useState(false); // Manage modal open/close state

  // Log current user profile for debugging
  console.log("Current user profile:", profile);

  // Load user profile on component mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUserProfile())
        .unwrap()
        .then(() => {
          toast.success('User data loaded successfully');
        })
        .catch((error) => {
          toast.error('Failed to load user data. Please log in again.');
          console.error(error);
        });
    }
  }, [dispatch, isAuthenticated]);

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    toast.success('Logged out successfully.');
    navigate('/'); // Navigate to login page after logout
  };

  // Toggle profile edit modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
      <div className="container mt-5">
        <h2 className="text-center">User Profile</h2>
        {/* Check if the profile is loading */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          profile ? (
            <div className="card mt-4">
    <div className="row no-gutters">
      <div className="col-md-6">
        <img 
          src={`http://localhost:3000${profile.profileImage}`} 
          alt="Profile" 
          className="img-fluid  p-3" 
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
        />
      </div>
      <div className="col-md-6">
        <div className="card-body">
          <h5 className="card-title">Name: {profile.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Email: {profile.email}</h6>
          <button className="btn btn-primary mt-3" onClick={toggleModal}>Edit Profile</button>
          <button className="btn btn-danger mt-3 ml-2" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  </div>

        ) : (
          <p>Please log in to view your profile.</p>
        )
      )}
      {/* Pass profile data to the modal for editing */}
      <EditProfileModal isOpen={isModalOpen} onClose={toggleModal} user={profile} />
    </div>
  );
};

export default Home;
