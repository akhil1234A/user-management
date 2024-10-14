import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice'; 
import { loadUserProfile, updateUserProfile } from '../../slices/userSlice'; // Added updateUserProfile
import EditProfileModal from './EditProfileModal'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { profile, loading, error} = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.auth); 
  
  const [isModalOpen, setModalOpen] = useState(false); 

  // Load user profile on component mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUserProfile())
        .unwrap()
        .then(() => {
          // toast.success('User data loaded successfully');
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
    localStorage.removeItem('role');
    toast.success('Logged out successfully.');
    navigate('/'); 
  };

  // Toggle profile edit modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Handle profile update
  const handleProfileUpdate = async (updatedData) => {
    try {
      await dispatch(updateUserProfile(updatedData)).unwrap();
      await dispatch(loadUserProfile()).unwrap(); // Reload the user profile after updating
      toast.success('Profile updated successfully'); // Notify success
      toggleModal(); // Close the modal
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  return (
      <>
        <NavBar/>
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
                    className="img-fluid p-3" 
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">Name: {profile.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Email: {profile.email}</h6>
                    <button className="btn btn-primary mt-3" onClick={toggleModal}>Edit Profile</button>
                    <button className="btn btn-danger mt-3 ms-2" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Please log in to view your profile.</p>
          )
        )}
        {/* Pass profile data and update handler to the modal for editing */}
        <EditProfileModal 
          isOpen={isModalOpen} 
          onClose={toggleModal} 
          user={profile} 
          onUpdate={handleProfileUpdate} // Pass the update handler
        />
      </div>
      </>
  );
};

export default ProfilePage;