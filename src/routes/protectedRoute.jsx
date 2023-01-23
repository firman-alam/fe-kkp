import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  console.log(accessToken);

  useEffect(() => {
    if (!accessToken) {
      setTimeout(() => {
        navigate('/masuk');
      }, 1);
    }
  }, [accessToken]);

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
