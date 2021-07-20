import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { withRouter } from 'react-router-dom';
import Routes from './Routes';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <ToastContainer/>
      <Routes></Routes>
    </>
  );
}

export default withRouter(App);
