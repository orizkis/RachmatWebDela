import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, PrivateRoute } from "../../components";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Dashboard } from "../../pages";

const MainApp = () => {
  let history = useHistory();
  return (
    <>
      <IconButton
        style={{
          color: "#FFFF",
          zIndex: 2000,
          position: "absolute",
          top: "8px",
          right: "10px",
        }}
        onClick={() => {
          localStorage.removeItem("token");
          history.push("login");
        }}
      >
        <ExitToApp />
      </IconButton>
      <Router>
        <Layout>
          <Switch>
            <PrivateRoute path="/" exact>
              <Dashboard />
            </PrivateRoute>
            {/* <PrivateRoute path="/supplier">
              <Supplier />
            </PrivateRoute>
            <PrivateRoute path="/customers">
              <Customers />
            </PrivateRoute>
            <PrivateRoute path="/pembelian">
              <Pembelian />
            </PrivateRoute>
            <PrivateRoute path="/penjualan">
              <Penjualan />
            </PrivateRoute> */}
          </Switch>
        </Layout>
      </Router>
    </>
  );
};

export default MainApp;
