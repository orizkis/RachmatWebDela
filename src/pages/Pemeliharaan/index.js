import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import "date-fns";
import React, { useEffect, useState } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  title: {
    width: "100%",
    color: "black",
    fontSize: "20px",
    textAlign: "center",
    margin: "15px 0",
  },
  cellHeader: {
    width: "100%",
    textAlign: "center",
    margin: "0 Auto",
  },

  grid: {
    dark: "#002884",
    width: "100%",
    padding: "15px",
  },
  gridleft: {
    dark: "#002884",
    width: "50%",
    float: "left",
  },
  gridright: {
    dark: "#002884",
    width: "50%",
    float: "left",
  },
  inputan: {
    width: "100%",
    float: "left",
    margin: "10px 20px 10px 0",
  },
  catatan: {
    width: "100%",
    margin: "20px 0",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    width: "80%",
    fontSize: "22px",
    margin: "15px 0",
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "#ffffff",
    backgroundColor: "#3F51B5",
    borderColor: "#0063cc",
  },
}));

function InputPemeliharaan() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    namaPengemudi: "",
    nomorBody: "",
    nopol: "",
    penyedia: "",
    waktuGangguan: "",
    deskripsi: "",
    checkProblem: [],
    tindakan: [],
    diagnosa: "",
    visit: "",
    perbaikanSelesai: "",
    waktuPerbaikan: "",
    catatan: "",
  });

  const [problem, setProblem] = React.useState({
    "Koneksi Jaringan": false,
    Hardware: false,
    "Kelistrikan Kendaraan": false,
    Software: false,
    "Kartu Rusak": false,
    "Lain-lain": false,
  });

  const [tindakan, setTindakan] = React.useState({
    Perbaikan: false,
    "Ganti Perangkat Baru": false,
    "Pindah / Lepas / Pasang": false,
  });

  const formatData = (data) => {
    const filtered = Object.entries(data);
    return filtered
      .map((r) => {
        if (r[1]) {
          return r[0];
        }
      })
      .filter((r) => r !== undefined);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeProblem = (event) => {
    setProblem({ ...problem, [event.target.name]: event.target.checked });
  };

  const handleChangeTindakan = (event) => {
    setTindakan({ ...tindakan, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let form = {
        ...state,
        checkProblem: formatData(problem),
        tindakan: formatData(tindakan),
      };
      console.log(form);
      // const response = await fetch(
      //   process.env.REACT_APP_URL + "/api/pml/data",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(form),
      //   }
      // );
      // const res = await response.json();
      // alert(res.status);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Encobus Form Checklist
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      ></Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Grid item xs={12} className={classes.grid}>
          <form onSubmit={handleSubmit}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cellHeader}>
                    <h1 className={classes.title}>
                      FORMULIR PERBAIKAN KERUSAKAN PERANGKAT TOB
                    </h1>
                    <h1 className={classes.title}>
                      SISTEM TIKET ELEKTRONIK DI KENDARAAN
                    </h1>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colspan={3}>
                    {/* <TextField
                    className={classes.inputan}
                    id="tanggal"
                    variant="outlined"
                    label="Tanggal"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}
                    {/* <TextField
                    className={classes.inputan}
                    id="rute-nonbrt"
                    label="Rute Non BRT"
                    variant="outlined"
                  /> */}
                    {/* <TextField
                    className={classes.inputan}
                    id="no-ticket"
                    label="No Ticket"
                    variant="outlined"
                  /> */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colspan={2}>
                    <h3 className={classes.text}>INFORMASI KENDARAAN</h3>
                    <TextField
                      className={classes.inputan}
                      id="nama-pengemudi"
                      label="Nama Pengemudi"
                      variant="outlined"
                      name="namaPengemudi"
                      value={state.namaPengemudi}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.inputan}
                      id="no-body-kendaraan"
                      label="Nomor Body Kendaraan "
                      variant="outlined"
                      name="nomorBody"
                      value={state.nomorBody}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.inputan}
                      id="no-polisi-kendaraan"
                      label="Nomor Polisi Kendaraan"
                      variant="outlined"
                      name="nopol"
                      value={state.nopol}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <h3 className={classes.text}>
                      INFORMASI PERANGAKAT READER
                    </h3>
                    <TextField
                      className={classes.inputan}
                      id="penyedia-perangkat"
                      label="Penyedia Perangkat"
                      variant="outlined"
                      name="penyedia"
                      value={state.penyedia}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.inputan}
                      id="waktu-gangguan"
                      label="Waktu Gangguan/Kerusakan : "
                      variant="outlined"
                      name="waktuGangguan"
                      value={state.waktuGangguan}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.inputan}
                      id="deskripsi-gangguan"
                      label="Deskripsi Gangguan"
                      multiline
                      rows={4}
                      variant="outlined"
                      name="deskripsi"
                      value={state.deskripsi}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <h3 className={classes.text}>CHECK PROBLEM</h3>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={problem["Koneksi Jaringan"]}
                            onChange={handleChangeProblem}
                            name="Koneksi Jaringan"
                          />
                        }
                        label="Koneksi Jaringan"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={problem.Hardware}
                            onChange={handleChangeProblem}
                            name="Hardware"
                          />
                        }
                        label="Hardware"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={problem["Kelistrikan Kendaraan"]}
                            onChange={handleChangeProblem}
                            name="Kelistrikan Kendaraan"
                          />
                        }
                        label="Kelistrikan Kendaraan"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={problem["Software"]}
                            onChange={handleChangeProblem}
                            name="Software"
                          />
                        }
                        label="Software"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={problem["Kartu Rusak"]}
                            onChange={handleChangeProblem}
                            name="Kartu Rusak"
                          />
                        }
                        label="Kartu Rusak"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={problem["Lain-lain"]}
                            onChange={handleChangeProblem}
                            name="Lain-lain"
                          />
                        }
                        label="Lain-lain"
                      />
                    </FormGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <h4>Tindakan yang dilakukan</h4>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tindakan["Perbaikan"]}
                          onChange={handleChangeTindakan}
                          name="Perbaikan"
                        />
                      }
                      label="Perbaikan"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={problem["Ganti Perangkat Baru"]}
                          onChange={handleChangeTindakan}
                          name="Ganti Perangkat Baru"
                        />
                      }
                      label="Ganti Perangkat Baru"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={problem["Pindah / Lepas / Pasang"]}
                          onChange={handleChangeTindakan}
                          name="Pindah / Lepas / Pasang"
                        />
                      }
                      label="Pindah / Lepas / Pasang"
                    />
                    <TextField
                      className={classes.inputan}
                      id="diagnosa-gangguan"
                      label="Diagnosa Gangguan / Kerusakan"
                      multiline
                      rows={4}
                      // defaultValue="Default Value"
                      variant="outlined"
                      name="diagnosa"
                      value={state.diagnosa}
                      onChange={handleChange}
                    />
                    <TextField
                      id="waktu-perbaikan"
                      label="Waktu Perbaikan"
                      variant="outlined"
                      type="time"
                      defaultValue="00:00"
                      className={classes.inputan}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      name="waktuPerbaikan"
                      value={state.waktuPerbaikan}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.inputan}
                      id="tanggal-selesai-perbaikan"
                      variant="outlined"
                      label="Tanggal Selesai Perbaikan"
                      type="date"
                      defaultValue="2021-01-01"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="perbaikanSelesai"
                      value={state.perbaikanSelesai}
                      onChange={handleChange}
                    />
                    <TextField
                      id="waktu-perbaikan"
                      label="Visit"
                      variant="outlined"
                      type="time"
                      defaultValue="00:00"
                      className={classes.inputan}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      name="visit"
                      value={state.visit}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.catatan}
                      id="catatan-teknisi"
                      label="Catatan Teknisi / Solusi"
                      multiline
                      rows={4}
                      // defaultValue="Default Value"
                      variant="outlined"
                      name="catatan"
                      value={state.catatan}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button type="submit" className={classes.button}>
              Input Data
            </Button>
          </form>
        </Grid>
      </main>
    </div>
  );
}
export default InputPemeliharaan;
