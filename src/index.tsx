import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Admin from "./admin";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
