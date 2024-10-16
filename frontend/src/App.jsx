import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoginPage from './pages/Login';
import SignupPage from './pages/User/SignUp';
import HomePage from './pages/User/HomePage';
import AdminPage from './pages/Admin/AdminPage';
import ProfilePage from './pages/User/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

import { loadUserFromToken } from './slices/authSlice'; // Import for token loading
import { loadUserProfile } from './slices/userSlice';
function App() {
//   const dispatch = useDispatch();

//   // Load user profile on first render (if token exists)
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         dispatch(loadUserFromToken());
//         dispatch(loadUserProfile()).catch((error) => {
//             console.error("Failed to load user profile:", error);
//             localStorage.removeItem('token');
//         });
//     }
// }, [dispatch]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/home" 
          element={<ProtectedRoute element={<HomePage />} requiredRole="user" />} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute element={<ProfilePage />} requiredRole="user" />} 
        />
        <Route 
          path="/admin" 
          element={<ProtectedRoute element={<AdminPage />} requiredRole="admin" />} 
        />
      </Routes>

      <ToastContainer 
        position="top-right"  
        autoClose={3000}      
        hideProgressBar={false} 
        newestOnTop={false}   
        closeOnClick          
        pauseOnHover          
        draggable             
      />
    </Router>
  );
}

export default App;
