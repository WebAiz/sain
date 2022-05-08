import React                                    from 'react';
import ReactDOM                                 from 'react-dom/client';
import './components/App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login                                    from './components/auth/Login';
import Reset                                    from './components/auth/Reset/Reset';
import Dashboard     from './components/Dashboard/Dashboard';
import {CommonPages} from './components/pages/CommonPages/CommonPages';
import Register      from './components/auth/Register';
import {Sidebar}                                from './components/Sidebar/Sidebar';
import App                                      from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
           <App/>
        </Router>
    </React.StrictMode>
);
