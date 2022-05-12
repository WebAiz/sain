import React, { useState } from 'react';

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

    function handleSubmit() {
        console.log(data);
    }
    return (
        <main className={'contacts'}>
            <h2>Contacts</h2>
            <form onSubmit={handleSubmit} className="form">
                <h1>Contacts</h1>
                <div className="form__body">
                    <div className="form__field">
                        <label htmlFor="region">Region</label>
                        <textarea onChange={(e) => handleChange(e.target.value, 'region')} value={data.address} name="data" id="region" placeholder="region" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="city">City</label>
                        <textarea onChange={(e) => handleChange(e.target.value, 'city')} value={data.address} name="data" id="city" placeholder="city" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="street">Street</label>
                        <textarea onChange={(e) => handleChange(e.target.value, 'street')} value={data.address} name="data" id="street" placeholder="street" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="address">Address</label>
                        <textarea onChange={(e) => handleChange(e.target.value, 'address')} value={data.address} name="data" id="address" placeholder="data streeet" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => handleChange(e.target.value, 'email')} value={data.email} type="email" placeholder="Email" id="email" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="tel1">Tel 1</label>
                        <input onChange={(e) => handleChange(e.target.value, 'telOne')} value={data.telOne} type="text" placeholder="tel 1" id="tel1" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="tel2">Tel 2</label>
                        <input onChange={(e) => handleChange(e.target.value, 'telTwo')} value={data.telTwo} type="text" placeholder="tel 2" id="tel2" />
                    </div>
                </div>

                <button type="submit">Save</button>
            </form>
        </main>
    );
}
