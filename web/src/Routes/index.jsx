import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Home from "../Pages/Home";
import ViewPackage from "../Pages/ViewPackage";
import CreatePackage from "../Pages/CreatePackage";
import Management from "../Pages/Management";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/viewPackage/:code" component={ViewPackage}/>
        <Route path="/createPackage" component={CreatePackage}/>
        <Route path="/management" component={Management}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
