import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Login, MainApp, Pemeliharaan, Support } from "../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/pemeliharaan">
          <Pemeliharaan />
        </Route>
        <Route path="/support">
          <Support />
        </Route>
        <PrivateRoute path="/">
          <MainApp />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
