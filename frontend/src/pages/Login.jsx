import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError, loadUserFromToken } from '../slices/authSlice'; 
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { email, password };
  
    // Dispatch loginUser and handle success with unwrap
    dispatch(loginUser(credentials))
      .unwrap()
      .then((data) => {
        const { token, role } = data; // Make sure your response contains both token and role
        localStorage.setItem('token', token); // Store the token
        localStorage.setItem('role', role); // Optionally store role in local storage
  
        // Navigate based on the role
        if (role === 'admin') {
          navigate('/admin'); // Redirect to admin page
        } else {
          navigate('/home'); // Redirect to user home page
        }
      })
      .catch((err) => {
        toast.error(err.message || 'Login failed');
      });
  };
  

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem('token')) {
      dispatch(loadUserFromToken()); // Load user on refresh if token exists
    }

    // Redirect based on role if authenticated
    if (isAuthenticated) {
      const storedRole = localStorage.getItem('role');
      if (storedRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    }

    if (error) {
      toast.error(error); // Display error message
      dispatch(clearError()); // Clear the error after displaying it
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Login</h2>
              {error && <p className="text-danger text-center">{error}</p>}
              <form onSubmit={handleLogin}>
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
                <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary">Signup</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
