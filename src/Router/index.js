import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Login, MainApp } from "../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <MainApp />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
