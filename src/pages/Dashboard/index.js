import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import Kelengkapan from "../Kelengkapan";
// import TestFungsi from "../TesFungsi";
import Reader from "./Reader";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Reader />
        </Grid>
        {/* <Grid item xs={12}>
          <Kelengkapan />
        </Grid>
        <Grid item xs={12}>
          <TestFungsi />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Dashboard;
