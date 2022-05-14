import {useEffect}                                                           from 'react';
import Login                                                                 from './auth/Login';
import Register                                                              from './auth/Register';
import {Sidebar}                                                             from './Sidebar/Sidebar';
import {Route, Routes, useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import Reset                                                                 from './auth/Reset/Reset';
import Dashboard      from './Dashboard/Dashboard';
import {CommonPages}  from './pages/CommonPages/CommonPages';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth}         from '../firebase';
import {ChildYear}    from './pages/ChildYear/ChildYear';
import {Contacts}     from './pages/Contacts/Contacts';
import {Stuff}        from './pages/Stuff/Stuff';
import {BlogsPage}    from './pages/BlogsPage/BlogsPage';

import './App.scss';
import {Images}       from './Images/Images';
import {Ceo}          from './pages/CEO/CEO';

function App() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log('APP UPDATE');
        if (loading) return;
        if (!user) return navigate('/login');
    }, [location.pathname]);
    return (
        <div className="App">
            {user && <Sidebar />}
            <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
                <Route path="/pages/:slug" element={<CommonPages />} />
                <Route path="/pages/:slug/:subSlug" element={<BlogsPage />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/child-year" element={<ChildYear />} />
                <Route path="/stuff" element={<Stuff />} />
                <Route path="/images/:slug" element={<Images />} />
                <Route path="/ceo" element={<Ceo />} />
            </Routes>
        </div>
    );
}

export default App;
