import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { loadUserProfile } from '../../slices/userSlice'; // Import the action to load profile
import { logout } from '../../slices/authSlice'; // Import logout action
import NavBar from './Navbar';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading, error } = useSelector((state) => state.user); // Access user profile from Redux
  console.log(profile)
  const { isAuthenticated } = useSelector((state) => state.auth); // Check if the user is authenticated

  // Fetch user data on component mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUserProfile())
        .unwrap()
        .catch((error) => {
          toast.error('Failed to load user data. Please log in again.');
          console.error(error);
        });
    }
  }, [dispatch, isAuthenticated]);

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully.');
    navigate('/');
  };

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <div className="row">
          <div className="col-md-12 text-center">
            {loading ? (
              <h1>Loading...</h1>
            ) : profile ? (
              <>
                <h1>Welcome, {profile.name}</h1> {/* Display the user's name */}
                <p className="lead">You are now logged in.</p>
              </>
            ) : (
              <p>Please log in to view your details.</p>
            )}
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
