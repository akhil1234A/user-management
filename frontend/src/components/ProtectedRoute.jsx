import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUserFromToken } from '../slices/authSlice'; // Adjust import based on your file structure

const ProtectedRoute = ({ element, requiredRole }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token'); // Get token from localStorage
    const { role, loading, isAuthenticated } = useSelector((state) => state.auth);

    // Only run effect if the token exists and isAuthenticated is false
    useEffect(() => {
        if (token && !isAuthenticated) {
            dispatch(loadUserFromToken());
        }
    }, [token, isAuthenticated, dispatch]);

    if (!token && !isAuthenticated) {
        return <Navigate to="/" />; // Redirect to login if not authenticated
    }

    if (loading) {
        return <div>Loading...</div>; // Display loading until role is fetched
    }

    if (requiredRole && (role === undefined || role !== requiredRole)) {
        return <Navigate to={role === 'admin' ? '/admin' : '/home'} />;
    }

    return element;
};

export default ProtectedRoute;
