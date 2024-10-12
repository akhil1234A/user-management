import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loadUserProfile } from './slices/userSlice';
import { useEffect } from 'react';

import LoginPage from './pages/Login';
import SignupPage from './pages/User/SignUp';
import HomePage from './pages/User/HomePage';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Replace 'token' with your token key
  return token ? element : <Navigate to="/" />; // Redirect to login if not authenticated
};



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUserProfile()); // Load user profile if token exists
    }
  }, [dispatch]);
  return (
    <Router>
      
      <Routes>
        {/* User routes*/}
          <Route path="/" element={<LoginPage />} /> 
          <Route path="/signup" element={<SignupPage />} /> 
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />

      </Routes>

      <ToastContainer 
        position="top-right"  // Set the position of the toast
        autoClose={3000}      // Set auto close after 3 seconds
        hideProgressBar={false} // Option to show/hide progress bar
        newestOnTop={false}   // If you want the newest toast on top
        closeOnClick          // Close on clicking the toast
        pauseOnHover          // Pause the timer when hovering over the toast
        draggable             // Allow drag-to-close feature
      />
    </Router>

  );
}

export default App;
