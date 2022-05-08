import React, { useEffect, useState }                                     from 'react';
import { useAuthState }                                                   from 'react-firebase-hooks/auth';
import { useNavigate }                                                    from 'react-router-dom';
import './Dashboard.scss';
import { auth, db, logout }                                               from '../../firebase';
import { query, collection, addDoc, doc, setDoc, getDocs, getDoc, where } from 'firebase/firestore';
import {Sidebar}                                                          from '../Sidebar/Sidebar';
function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
        }
    };

    async function fetchData() {
        const docRef = doc(db, 'cities', 'new-city-id');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
        }
        // const q = query(collection(db, 'contacts'), where('capital', '==', true));
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, ' => ', doc.data());
        // });
    }
    async function addData() {
        // const cityRef = doc(db, 'contacts', 'contacts');
        // setDoc(cityRef, { capital: true, fdsfds: 'fsdf' }, { merge: true });
        // const docRef = await addDoc(collection(db, 'contacts'), {
        //     name: 'Tokyo',
        //     country: 'Japan',
        // });
        // await setDoc(doc(db, 'cities', 'new-city-id'), {
        //     name: 'Tokyo',
        //     country: 'Japan',
        // });
        // console.log('Document written with ID: ', docRef.id);
        // Add a new document with a generated id
        // const newCityRef = doc(collection(db, 'contacts'));
        // // later...
        // await setDoc(newCityRef, { address: 'fffffdfsdfsdfdsffffff' });
    }
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/');
        fetchUserName();
    }, [user, loading]);
    return (
        <div className="dashboard">
            <div className="dashboard__container">


                {/* TODO delete later*/}
                <div>
                    Logged in as
                    <div>{name}</div>
                    <div>{user?.email}</div>
                    <button onClick={() => fetchData()}>Fetch</button>
                    <button onClick={() => addData()}>Add</button>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
