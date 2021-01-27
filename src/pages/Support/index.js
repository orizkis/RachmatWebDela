import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

const drawerWidth = 240;

let a = {
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
}

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
  logo: {
    margin: "20px 0",
    width: "80px",
    padding: "10px",
    height: "auto",
    float: "left",
  },
  title: {
    width: "300px",
    height: "auto",
    color: "#000000",
    textAlign: "center",
    margin: "0 auto",
    fontSize: "20px",
    padding: "10px",
  },

  subtitle: {
    width: "300px",
  },
  datadoc: {
    width: "22%",
    float: "left",
    color: "#000000",
    textAlign: "left",
    fontSize: "18px",
    lineHeight: "0.2em",
  },
  inputanHead: {
    width: "50%",
    float: "left",
    margin: "10px 20px 10px 0",
  },
  inputan: {
    width: "100%",
    float: "left",
    margin: "10px 20px 10px 0",
  },
  button: {
    width: "80%",
    fontSize: "25px",
    margin: "15px 0",
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "black",
    backgroundColor: "#3F51B5",
    borderColor: "#0063cc",
  },
  formRadio: {
    width: "100%",
    margin: "20px 0",
  },
  labelRadio: {
    color: "black",
  },
  checkbox: {
    width: "100%",
    margin: "20px 0",
  },
  grid: {
    spacing: "20px",
    border: "4px solid",
    padding: "15px",
  },
}));

function InputSupport() {
  const classes = useStyles();
  const [state, setstate] = useState({
    jenisPeralatan: "",
    serialNumber: "",
    noBody: "",
    terminalId: "",
    gateId: "",
    testTapping: [],
    testPower: "",
    testRtc: "",
    testGp: "",
    keterangan: "",
  });

  const [bank, setBank] = useState({
    BNI: false,
    BRI: false,
    mandiri: false,
    BCA: false,
    DKI: false,
  });

  let selectBank = () => {
    const filtered = Object.entries(bank);
    return filtered
      .map((r) => {
        if (r[1]) {
          return r[0];
        }
      })
      .filter((r) => r !== undefined);
  };

  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeTapping = (event) => {
    setBank({ ...bank, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let form = { ...state, testTapping: selectBank() };
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/supp/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const res = await response.json();
      alert(res.status);
    } catch (err) {
      alert(err.message);
    }
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} container spacing={2} className={classes.grid}>
            <Table>
              <TableHead>
                <TableRow>
                  <h1 className={classes.title}>CHEKLIST SETUP TOB/TOA</h1>
                  <h1 className={classes.title}>
                    PROYEK PENGADAAN DAN PEMASANGAN PERALATAN TOB/TOA TAHUN 2020
                  </h1>
                </TableRow>
                {/* <Divider />
              <TableRow>
                <TextField
                  className={classes.inputanHead}
                  id="date"
                  label="Hari / Tanggal"
                  variant="outlined"
                  type="date"
                  name="tanggal"
                />
                <TextField
                  className={classes.inputanHead}
                  id="team_setup"
                  label="Team Setup"
                  variant="outlined"
                />
              </TableRow>*/}
              </TableHead>
              <Divider />

              <TableBody>
                <TableRow>
                  <TableCell>
                    <FormControl
                      className={classes.formRadio}
                      component="fieldset"
                    >
                      <FormLabel component="legend">
                        Jenis Peralatan TOB /TOA
                      </FormLabel>
                      <RadioGroup
                        aria-label="jenisperalatan"
                        name="jenisPeralatan"
                        value={state.jenisPeralatan}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="tob"
                          control={<Radio />}
                          label="Bisa"
                        />
                        <FormControlLabel
                          value="tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      className={classes.inputan}
                      id="serial-number"
                      label="Serial Number"
                      variant="outlined"
                      name="serialNumber"
                      value={state.serialNumber}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.inputan}
                      id="no-body"
                      label="Nomor Body + Posisi"
                      variant="outlined"
                      name="noBody"
                      value={state.noBody}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.inputan}
                      id="id-terminal"
                      label="Terminal ID"
                      variant="outlined"
                      name="terminalId"
                      value={state.terminalId}
                      onChange={handleChange}
                    />
                    <TextField
                      className={classes.inputan}
                      id="id-gate"
                      label="Gate ID"
                      variant="outlined"
                      name="gateId"
                      value={state.gateId}
                      onChange={handleChange}
                    />
                    <FormGroup row className={classes.checkbox}>
                      <h5 className={classes.subtitle}>TEST TAPPING</h5>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bank.BNI}
                            onChange={handleChangeTapping}
                            name="BNI"
                            color="primary"
                          />
                        }
                        label="BNI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bank.BRI}
                            onChange={handleChangeTapping}
                            name="BRI"
                            color="primary"
                          />
                        }
                        label="BRI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bank.mandiri}
                            onChange={handleChangeTapping}
                            name="mandiri"
                            color="primary"
                          />
                        }
                        label="Mandiri"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bank.BCA}
                            onChange={handleChangeTapping}
                            name="BCA"
                            color="primary"
                          />
                        }
                        label="BCA"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bank.DKI}
                            onChange={handleChangeTapping}
                            name="DKI"
                            color="primary"
                          />
                        }
                        label="DKI"
                      />
                    </FormGroup>
                    <FormControl
                      className={classes.formRadio}
                      component="fieldset"
                    >
                      <FormLabel
                        component="legend"
                        className={classes.labelRadio}
                      >
                        Test Power Fail
                      </FormLabel>
                      <RadioGroup
                        aria-label="tetspowerfail"
                        name="testPower"
                        value={state.testPower}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          value="ok"
                          control={<Radio />}
                          label="OK"
                        />
                        <FormControlLabel
                          value="tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormControl
                      className={classes.formRadio}
                      component="fieldset"
                    >
                      <FormLabel
                        component="legend"
                        className={classes.labelRadio}
                      >
                        Test RTO
                      </FormLabel>
                      <RadioGroup
                        aria-label="tetspowerfail"
                        name="testRtc"
                        value={state.testRtc}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          value="ok"
                          control={<Radio />}
                          label="OK"
                        />
                        <FormControlLabel
                          value="tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>{" "}
                    <FormControl
                      className={classes.formRadio}
                      component="fieldset"
                    >
                      <FormLabel
                        component="legend"
                        className={classes.labelRadio}
                      >
                        Test GP100
                      </FormLabel>
                      <RadioGroup
                        aria-label="tetspowerfail"
                        name="testGp"
                        value={state.testGp}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          value="ok"
                          control={<Radio />}
                          label="OK"
                        />
                        <FormControlLabel
                          value="tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                    {/* <h5>KONFIGURASI BANK</h5>
                  <TextField
                    className={classes.inputan}
                    id="bni_mid"
                    label="BNI MID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="bni_tid"
                    label="BNI TID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="bri_mid"
                    label="BRI MID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="bri_tid"
                    label="BRI TID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="bri_pcd"
                    label="BRI PCD"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="mandiri_sam_pin"
                    label="MANDIRI SAM PIN"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="mandiri_mid"
                    label="MANDIRI MID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="mandiri_tid"
                    label="MANDIRI TID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="bca_mid"
                    label="BCA MID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="bca_tid"
                    label="BCA TID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="dki_mid"
                    label="DKI MID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="dki_tid"
                    label="DKI TID"
                    variant="outlined"
                  />
                  <TextField
                    className={classes.inputan}
                    id="mandiri_mid"
                    label="MANDIRI MID"
                    variant="outlined"
                  /> */}
                    <TextField
                      className={classes.inputan}
                      id="keterangan"
                      label="KETERANGAN"
                      variant="outlined"
                      name="keterangan"
                      value={state.keterangan}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Button type="submit" className={classes.button}>
            Input Data
          </Button>
        </form>
      </main>
    </div>
  );
}
export default InputSupport;
