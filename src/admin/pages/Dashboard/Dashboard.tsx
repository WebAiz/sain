import React, { useEffect } from 'react';
import './Dashboard.scss';
function Dashboard({ user }) {
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
