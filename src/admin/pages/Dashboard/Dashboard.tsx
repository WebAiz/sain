import React from 'react';
import './Dashboard.scss';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../../firebase';

export function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
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
