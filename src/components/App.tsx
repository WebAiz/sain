import React, {useEffect}                                    from 'react';
import Login                                                 from './auth/Login';
import Register                                              from './auth/Register';
import {Sidebar}                                             from './Sidebar/Sidebar';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Reset                                                 from './auth/Reset/Reset';
import Dashboard                                             from './Dashboard/Dashboard';
import {CommonPages}                                         from './pages/CommonPages/CommonPages';
import './App.scss';
import {useAuthState}                                        from 'react-firebase-hooks/auth';
import {auth}                                                from '../firebase';
import {ChildYear}                                           from './pages/ChildYear/ChildYear';
import {Contacts}                                            from './pages/Contacts/Contacts';
import {Stuff}                                               from './pages/Stuff/Stuff';
import {SubPage}                                             from './pages/CommonPages/SubPage/SubPage';
import {Pages}                                               from './pages/Pages/Pages';

function App() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/login');
    }, [user, loading]);
    return (
        <div className="App">
            {user && <Sidebar />}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
                <Route path="/pages/:slug" element={<CommonPages />} />
                <Route path="/pages/:slug/:subSlug" element={<SubPage />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/child-year" element={<ChildYear />} />
                <Route path="/stuff" element={<Stuff />} />
            </Routes>
        </div>
    );
}

export default App;
