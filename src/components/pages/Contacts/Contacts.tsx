import React, {useEffect, useState} from 'react';
import {doc, getDoc, setDoc}        from 'firebase/firestore';
import {db}                  from '../../../firebase';

export function Contacts() {
    const [data, setdata] = useState({
        address: '',
        email: '',
        telOne: '',
        telTwo: '',
        street: '',
        city: '',
        region: '',
    });
    function handleChange(value: string, field: string) {
        switch (field) {
            case 'region': {
                setdata({ ...data, region: value });
                break;
            }
            case 'city': {
                setdata({ ...data, city: value });
                break;
            }
            case 'street': {
                setdata({ ...data, street: value });
                break;
            }
            case 'address': {
                setdata({ ...data, address: value });
                break;
            }
            case 'email': {
                setdata({ ...data, email: value });
                break;
            }
            case 'telOne': {
                setdata({ ...data, telOne: value });
                break;
            }
            case 'telTwo': {
                setdata({ ...data, telTwo: value });
                break;
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setDBData()
    }
    async function getDBData() {
        const docRef = doc(db, 'contacts', 'address');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const res = docSnap.data();
            setdata({...data, ...res});
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
        }
    }

    function setDBData() {
        // Add a new document in collection "cities"
        setDoc(doc(db, 'contacts', 'address'), {
           ...data
        }).then(res => {
            alert('Data successfully updated');
            window.location.reload();
        });
    }
    useEffect(()=>{
        getDBData()
    },[])
    return (
        <main className={'contacts'}>
            <h2>Contacts</h2>
            <form onSubmit={handleSubmit} className="form mb">
                <h1>Contacts</h1>
                <div className="form__body">
                    <div className="form__field">
                        <label htmlFor="region">Region</label>
                        <textarea
                            required
                            onChange={(e) => handleChange(e.target.value, 'region')}
                            value={data.region}
                            name="data"
                            id="region"
                            minLength={2}
                            placeholder="region" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="city">City</label>
                        <textarea
                            required
                            onChange={(e) => handleChange(e.target.value, 'city')}
                            value={data.city}
                            name="data"
                            id="city"
                            minLength={2}
                            placeholder="city" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="street">Street</label>
                        <textarea
                            required
                            onChange={(e) => handleChange(e.target.value, 'street')}
                            value={data.street}
                            name="data"
                            id="street"
                            minLength={2}
                            placeholder="street" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="address">Address</label>
                        <textarea
                            required
                            onChange={(e) => handleChange(e.target.value, 'address')}
                            value={data.address}
                            name="data"
                            id="address"
                            minLength={5}
                            placeholder="data streeet" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="email">Email</label>
                        <input
                            required
                            onChange={(e) => handleChange(e.target.value, 'email')}
                            value={data.email}
                            type="email"
                            placeholder="Email"
                            id="email" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="tel1">Tel 1</label>
                        <input
                            required
                            onChange={(e) => handleChange(e.target.value, 'telOne')}
                            value={data.telOne}
                            type="text"
                            placeholder="tel 1"
                            max={11}
                            min={10}
                            id="tel1" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="tel2">Tel 2</label>
                        <input
                            onChange={(e) => handleChange(e.target.value, 'telTwo')}
                            value={data.telTwo}
                            type="text"
                            max={11}
                            min={10}
                            placeholder="tel 2"
                            id="tel2" />
                    </div>
                </div>

                <button type="submit">Save</button>
            </form>
        </main>
    );
}
