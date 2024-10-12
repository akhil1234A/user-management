import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../slices/authSlice'; // Import clearError action
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading state and error from Redux store
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate image file
    if (profileImage && !profileImage.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage); // Add the image file

    try {
      await dispatch(registerUser(formData)).unwrap(); // Ensure you handle the promise properly
      // toast.success('Registration successful!');
      navigate('/home'); // Redirect to home page after registration
    } catch (err) {
      // Display a more specific error message based on server response
      if (err.response && err.response.data && err.response.data.message) {
        // toast.error(err.response.data.message);
      } else {
        // toast.error('Registration failed, please try again');
      }
      console.error(err);
    }
  };

  // Effect to clear error messages if they exist
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError()); // Clear the error after showing the toast
    }
  }, [error, dispatch]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSignup}>
                <div className="form-group mb-4">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="profileImage" className="form-label">Profile Image</label>
                  <input
                    type="file"
                    id="profileImage"
                    className="form-control"
                    accept="image/*" // Limit file selection to images
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3" 
                  disabled={loading} // Disable the button if loading
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
                {loading && <div className="text-center">Loading...</div>} {/* Optional loader */}
              </form>
              <div className="text-center mt-3">
                <p>Already have an account? <Link to="/" className="text-primary">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
