import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles  }) => {
const { user } = useAuth();
  const location = useLocation();

  // not logged in at all
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // not allowed for this role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  // if (!user) {
  //   // User is not logged in — redirect to login page
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
