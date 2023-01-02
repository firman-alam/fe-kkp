import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      setTimeout(() => {
        navigate('/auth');
      }, 1);
    }
  }, [userToken]);

  // show unauthorized screen if no user is found in redux store
  // if (!userToken) {
  //   return (
  //     <div className='unauthorized'>
  //       <h1>Unauthorized :(</h1>
  //       <span>
  //         <NavLink to='/auth'>Login</NavLink> to gain access
  //       </span>
  //     </div>
  //   );
  // }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
