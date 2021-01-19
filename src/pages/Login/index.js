import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Gap } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  container: {
    width: "300px",
    display: "flex",
    flexDirection: "column",
  },
}));

const Login = () => {
  let history = useHistory();
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item className={classes.container}>
        <Typography variant="h4" align="center">
          Sign In
        </Typography>
        <Gap height={20} />
        <TextField
          id="outlined-username-input"
          label="Username"
          type="username"
          autoComplete="current-username"
          variant="outlined"
        />
        <Gap height={10} />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Gap height={20} />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("token", "123456");
            history.push("/");
          }}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
