import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react"; // Import ReactNode
import { useAuth } from "../AuthProvider/AuthContext";


interface PrivateRouteProps {
  children: ReactNode; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a loading spinner while loading is true
  if (loading) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400 dark:border-violet-600"></div>
    );
  }

  // Return children if the user is authenticated; otherwise, navigate to login
  if (user) {
    return <>{children}</>; // Fragment to ensure a valid JSX element is returned
  } else {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
};

export default PrivateRoute;
