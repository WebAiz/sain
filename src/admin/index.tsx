import {useEffect} from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import {Sidebar} from '../components/Sidebar/Sidebar';
import {Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Reset from '../components/auth/Reset/Reset';
import Dashboard from './pages/Dashboard/Dashboard';
import {CommonPages} from './pages/CommonPages/CommonPages';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import {ChildYear} from './pages/ChildYear/ChildYear';
import {Contacts} from './pages/Contacts/Contacts';
import {Stuff} from './pages/Stuff/Stuff';
import {BlogsPage} from './pages/BlogsPage/BlogsPage';

import '../index.scss';
import {Images} from '../components/Images/Images';
import {Ceo} from './pages/CEO/CEO';

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
        <div className="App">
            {!user && <Login />}
            {user && <Sidebar />}
            {user &&
              <Outlet />
            }
        </div>
    );
}

export default Admin;
