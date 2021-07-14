import React from 'react';
import ReactDOM from 'react-dom';

// import Home from './Pages/Home';
import ViewPackage from './Pages/ViewPackage';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <ViewPackage />
  </React.StrictMode>,
  document.getElementById('root')
);

