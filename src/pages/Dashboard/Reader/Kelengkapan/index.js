import {
  FormControl,
  Input,
  InputAdornment,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Gap } from "../../../../components";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 500,
  },
  textField: {
    width: "10ch",
  },
}));

const Kelengkapan = ({ title, idReader }) => {
  const classes = useStyles();
  const [state, setState] = React.useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/data/component"
      );
      let res = await response.json();
      setState(res.data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    let data = state.map((row) => {
      if (row.id_barang === Number(event.target.name)) {
        return {
          ...row,
          [event.target.type === "textarea" ? "keterangan" : "jumlah"]: event
            .target.value,
        };
      }
      return row;
    });
    setState(data);
  };

  const handleClick = async (idReader) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/data/kelengkapan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: state.map((row) => {
              return {
                idReader,
                idBarang: row.id_barang,
                jumlah: row.jumlah,
                keterangan: row.keterangan,
              };
            }),
          }),
        }
      );
      let res = await response.json();
      alert(res.status);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Gap height={40} />
          <Typography variant="h6" gutterBottom component="div">
            Add Kelengkapan ({title})
          </Typography>
          <Gap height={20} />
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            {state.length === 0 && (
              <div>
                <CircularProgress color="secondary" />
              </div>
            )}
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
                  {state.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.nama_barang}
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
                            value={row.jumlah === 0 ? null : row.jumlah}
                            name={row.id_barang}
                            onChange={handleChange}
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
                          style={{ minWidth: 150 }}
                          rowsMin={2}
                          name={row.id_barang}
                          value={row.keterangan}
                          onChange={handleChange}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Gap height={10} />
          <Button
            onClick={() => handleClick(idReader)}
            variant="contained"
            color="secondary"
            style={{ alignSelf: "flex-end" }}
          >
            Add
          </Button>
          <Gap height={10} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Kelengkapan;
