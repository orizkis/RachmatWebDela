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
import { Input, FormControl, InputAdornment } from "@material-ui/core";
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
    namaBarang: "Casing (Casing Depan)",
    jumlah: 10,
    satuan: "pcs",
    keterangan: "tidak ada",
  },
  {
    namaBarang: "Housing Casing (Casing Belakang)",
    jumlah: 2,
    satuan: "dus",
    keterangan: "tidak ada",
  },
];

const Kelengkapan = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Nama Barang</TableCell>
            <TableCell align="right">Jumlah</TableCell>
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
                <FormControl
                  className={clsx(
                    classes.margin,
                    classes.withoutLabel,
                    classes.textField
                  )}
                >
                  <Input
                    value={row.jumlah}
                    endAdornment={
                      <InputAdornment position="end">
                        {row.satuan}
                      </InputAdornment>
                    }
                    inputProps={{
                      "aria-label": "jumlah",
                    }}
                  />
                </FormControl>
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

export default Kelengkapan;
