import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";
import Kelengkapan from "./Kelengkapan";
import TesFungsi from "./TesFungsi";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const Row = ({ data }) => {
  const [open, setOpen] = useState({ kelengkapan: false, tesFungsi: false });
  const { kelengkapan, tesFungsi } = open;
  return (
    <>
      <TableRow key={data.nama_alat}>
        <TableCell component="th" scope="row">
          {data.nama_alat}
        </TableCell>
        <TableCell align="right">{data.jenis_or_type}</TableCell>
        <TableCell align="right">{data.serial_number_reader}</TableCell>
        <TableCell align="right">
          {moment(data.created_at).format("DD-MM-YYYY")}
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() =>
              setOpen({
                ...open,
                kelengkapan: !kelengkapan,
              })
            }
          >
            {kelengkapan ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen({ ...open, tesFungsi: !tesFungsi })}
          >
            {tesFungsi ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      {/* Edit Disini */}
      {/* {kelengkapan && (
        <Kelengkapan title={data.nama_alat} idReader={data.id_reader} />
      )} */}
       <SimpleDialog title={data.nama_alat} idReader={data.id_reader} open={open.kelengkapan} onClose={()=> { 
         setOpen({
                ...open,
                kelengkapan:false,
              })}} />
      {tesFungsi && <TesFungsi title={data.nama_alat} />}
    </>
  );
};

const Reader = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Alat</TableCell>
            <TableCell align="right">Tipe</TableCell>
            <TableCell align="right">Serial Number</TableCell>
            <TableCell align="right">Created at</TableCell>
            <TableCell align="right">Kelengkapan</TableCell>
            <TableCell align="right">Tes Fungsi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{data && data.map((row) => <Row data={row} />)}</TableBody>
      </Table>
    </TableContainer>
  );
};

function SimpleDialog({idReader, title, open, onClose}) {
  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <Kelengkapan title={title} idReader={idReader} />
    </Dialog>
  );
}

export default Reader;
