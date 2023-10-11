import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import "./main.less"
import UserStore from './store/userStore.js'
import { Context } from './context/Context.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Context.Provider value={{user: new UserStore()}}>
        <App />
    </Context.Provider>
    </Router>
);
