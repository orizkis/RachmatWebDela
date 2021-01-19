import React from "react";
import { Layout } from "../../components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Customers,
  Dashboard,
  Pembelian,
  Penjualan,
  Supplier,
} from "../../pages";

const MainApp = () => {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/supplier">
              <Supplier />
            </Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/Pembelian">
              <Pembelian />
            </Route>
            <Route path="/Penjualan">
              <Penjualan />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
};

export default MainApp;
