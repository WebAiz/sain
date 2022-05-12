// @flow
import * as React from 'react';

type Props = {};

export function Stuff(props: Props) {
    const [data, setdata] = React.useState({
        fullName: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    function handleChange(value: string, field: string) {
        switch (field) {
            case 'fullName': {
                setdata({ ...data, fullName: value });
                break;
            }
        }
    }
    return (
        <main className={'stuff'}>
            <h2>Stuff</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form__body">
                    <div className="form__field">
                        <label htmlFor="address">Address</label>
                        <textarea onChange={(e) => handleChange(e.target.value, 'address')} value={data.fullName} name="data" id="address" placeholder="data streeet" />
                    </div>
                </div>

                <button type="submit">Save</button>
            </form>
        </main>
    );
}
