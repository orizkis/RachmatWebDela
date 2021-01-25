import { Radio, TextareaAutosize, Typography, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState, useEffect } from "react";
import { Gap } from "../../../../components";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

let formatData = (data) => {
  let result = [];
  data.forEach((row) => {
    if (!row.id_parent_fungsi1 && !row.id_parent_fungsi2) {
      result.push({ ...row, children: [] });
    } else {
      result.forEach((row2) => {
        if (row2.id_test === row.id_parent_fungsi1 && !row.id_parent_fungsi2) {
          row2.children.push({ ...row, children: [] });
        }
        if (row2.id_test === row.id_parent_fungsi2) {
          row2.children.forEach((row3) => {
            if (row3.id_test === row.id_parent_fungsi1) {
              row3.children.push(row);
            }
          });
        }
      });
    }
  });
  return result;
};

const SecondRow = ({ row, handleChange }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {row.children.length > 0 && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nama_test}
        </TableCell>
        <TableCell align="right">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Radio
              checked={row.hasilTest === "bisa"}
              onChange={handleChange}
              value="bisa"
              name={row.id_test}
              inputProps={{ "aria-label": "A" }}
              color="primary"
            />
            <Radio
              checked={row.hasilTest === "tidak"}
              onChange={handleChange}
              value="tidak"
              name={row.id_test}
              inputProps={{ "aria-label": "A" }}
            />
          </div>
        </TableCell>
        <TableCell align="right">
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            style={{ minWidth: 150 }}
            rowsMin={2}
            onChange={handleChange}
            value={row.keterangan}
            name={row.id_test}
          />
        </TableCell>
      </TableRow>
      {open &&
        row.children.map((data) => (
          <ThirdRow row={data} handleChange={handleChange} />
        ))}
    </React.Fragment>
  );
};

const ThirdRow = ({ row, handleChange }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{ paddingLeft: 40 }}>
          {row.children.length > 0 && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row" style={{ paddingLeft: 40 }}>
          {row.nama_test}
        </TableCell>
        <TableCell align="right">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Radio
              checked={row.hasilTest === "bisa"}
              onChange={handleChange}
              value="bisa"
              name={row.id_test}
              inputProps={{ "aria-label": "A" }}
              color="primary"
            />
            <Radio
              checked={row.hasilTest === "tidak"}
              onChange={handleChange}
              value="tidak"
              name={row.id_test}
              inputProps={{ "aria-label": "A" }}
            />
          </div>
        </TableCell>
        <TableCell align="right">
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            style={{ minWidth: 150 }}
            rowsMin={2}
            onChange={handleChange}
            value={row.keterangan}
            name={row.id_test}
          />
        </TableCell>
      </TableRow>
      {open &&
        row.children.map((data) => (
          <TableRow className={classes.root}>
            <TableCell></TableCell>
            <TableCell component="th" scope="row" style={{ paddingLeft: 80 }}>
              {data.nama_test}
            </TableCell>
            <TableCell align="right">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Radio
                  checked={data.hasilTest === "bisa"}
                  onChange={handleChange}
                  value="bisa"
                  name={data.id_test}
                  inputProps={{ "aria-label": "A" }}
                  color="primary"
                />
                <Radio
                  checked={data.hasilTest === "tidak"}
                  onChange={handleChange}
                  value="tidak"
                  name={data.id_test}
                  inputProps={{ "aria-label": "A" }}
                />
              </div>
            </TableCell>
            <TableCell align="right">
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Empty"
                style={{ minWidth: 150 }}
                rowsMin={2}
                onChange={handleChange}
                value={data.keterangan}
                name={data.id_test}
              />
            </TableCell>
          </TableRow>
        ))}
    </React.Fragment>
  );
};

const TesFungsi = ({ title }) => {
  const [state, setState] = useState([]);
  const [form, setForm] = useState();

  const handleChange = (event) => {
    let data = state.map((row) => {
      if (row.id_test === event.target.name) {
        return {
          ...row,
          [event.target.type === "radio" ? "hasilTest" : "keterangan"]: event
            .target.value,
        };
      }
      return row;
    });
    setState(data);
  };

  const getData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/data/list_tes"
      );
      let res = await response.json();
      setState(res.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClick = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/data/test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: form,
          }),
        }
      );
      let res = await response.json();
      alert(res.status);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (state) {
      let data = state.map((row) => {
        return {
          idReader: 1,
          idTestFungsi: row.id_test,
          hasilTest: row.hasilTest,
          keterangan: row.keterangan,
        };
      });
      setForm(data);
    }
  }, [state]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
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
              Add Tes Fungsi ({title})
            </Typography>
            <Gap height={20} />
            <TableContainer component={Paper}>
              <Table style={{ minWidth: 500 }} aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Nama Test</TableCell>
                    <TableCell align="right">Bisa / Tidak</TableCell>
                    <TableCell align="right">Keterangan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formatData(state).map((row) => (
                    <SecondRow
                      key={row.name}
                      row={row}
                      handleChange={handleChange}
                      handleClick={handleClick}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Gap height={10} />
            <Button
              onClick={handleClick}
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
    </>
  );
};

export default TesFungsi;
