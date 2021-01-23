import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Input, FormControl, InputAdornment, Radio } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
  textField: {
    width: "10ch",
  },
}));

const rows = [
  {
    namaBarang: "Pengecekan Short-Circuit Wiring Kabel DC",
    jumlah: 10,
    satuan: "pcs",
    keterangan: "tidak ada",
  },
  {
    namaBarang: "Pengetesan Aplikasi Enco Bus 100",
    jumlah: 10,
    satuan: "pcs",
    keterangan: "tidak ada",
  },
  {
    namaBarang: "Setting Tegangan Output (6,9 - 7,1VDC)",
    jumlah: 10,
    satuan: "pcs",
    keterangan: "tidak ada",
  },
  {
    namaBarang: "Pengecekan Short-Circuit Wiring Kabel DC",
    jumlah: 10,
    satuan: "pcs",
    keterangan: "tidak ada",
  },
  {
    namaBarang: "Pengecekan Tegangan Output (6,9 - 7,1VDC)",
    jumlah: 10,
    satuan: "pcs",
    keterangan: "tidak ada",
  },
];

const TestFungsi = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Item Pengetesan</TableCell>
            <TableCell align="right">Bisa/Tidak</TableCell>
            <TableCell align="right">Keterangan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.namaBarang}
              </TableCell>
              <TableCell align="right">
                <Radio
                  checked={selectedValue === "a"}
                  onChange={handleChange}
                  value="a"
                  name={row.namaBarang}
                  inputProps={{ "aria-label": "A" }}
                  color="primary"
                />
                <Radio
                  checked={selectedValue === "b"}
                  onChange={handleChange}
                  value="b"
                  name={row.namaBarang}
                  inputProps={{ "aria-label": "B" }}
                  color="secondary"
                />
              </TableCell>
              <TableCell align="right">
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Empty"
                  style={{ width: 250 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestFungsi;
