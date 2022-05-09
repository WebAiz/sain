import React, { useEffect, useState }                                     from 'react';
import { useAuthState }                                                   from 'react-firebase-hooks/auth';
import { useNavigate }                                                    from 'react-router-dom';
import './Dashboard.scss';
import { auth, db, logout }                                               from '../../firebase';
import { query, collection, addDoc, doc, setDoc, getDocs, getDoc, where } from 'firebase/firestore';
import {Sidebar}                                                          from '../Sidebar/Sidebar';
function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/');
    }, [user, loading]);
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div>
                    Logged in as
                    <div>{user?.email}</div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
