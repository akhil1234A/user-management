import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const { token } = useSelector((state) => state.admin);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
