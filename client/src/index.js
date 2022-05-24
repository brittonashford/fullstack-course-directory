import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from './Context';
import {BrowserRouter } from 'react-router-dom';
import './styles/reset.css';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>   
  </Provider>
);
