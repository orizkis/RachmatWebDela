import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Reader from "./Reader";
import { Gap } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: { padding: 20 },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    namaAlat: "",
    jenis: "",
    serialNumber: "",
  });
  const [reader, setReader] = useState();
  console.log(reader);

  const getReader = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/data/reader"
      );
      let res = await response.json();
      setReader(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getReader();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_URL + "/api/data/input_reader",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      }
    );
    await response.json();
    setReader([
      ...reader,
      {
        created_at: Date.now(),
        id_reader: "pending",
        jenis_or_type: state.jenis,
        nama_alat: state.namaAlat,
        serial_number_reader: state.serialNumber,
      },
    ]);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom component="div">
              Add Reader
            </Typography>
            <Gap height={20} />
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="namaAlat"
                    onChange={handleChange}
                    value={state.namaAlat}
                    label="Nama Alat"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="jenis"
                    onChange={handleChange}
                    value={state.jenis}
                    label="Jenis/Tipe"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={8} md={8}>
                  <TextField
                    name="serialNumber"
                    onChange={handleChange}
                    value={state.serialNumber}
                    label="Serial Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Button type="submit" variant="contained" color="secondary">
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Reader data={reader} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
