/* import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// TODO: Import react-router-dom and change the following code to support routing
// with BrowserRouter.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

/* 

To support routing
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
