import {useEffect} from 'react';
import Login from '../components/auth/Login';
import {Sidebar} from '../components/Sidebar/Sidebar';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import './Admin.scss';

function Admin() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log('APP UPDATE', user);
    if (loading) return;
    if (!user) return navigate('/admin');
  }, [location.pathname]);
  return (
      <div className="admin">
        {!user && <Login />}
        {user && <Sidebar />}
        {user &&
          <Outlet />
        }
      </div>
  );
}

export default Admin;
