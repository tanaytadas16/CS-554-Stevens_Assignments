import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import createStore from './store';

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={createStore}>
        <App />
    </Provider>
);
