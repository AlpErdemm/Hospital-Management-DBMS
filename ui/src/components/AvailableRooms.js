import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { baseURL } from '../config';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AvailableRooms = () => {
  const classes = useStyles();
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    fetch(baseURL + '/availableRooms')
      .then(res => res.json())
      .then(
        (result) => setAvailableRooms(result),
        (error) => console.log(error)
      )
  }, [])

  return (
    <>
      <h1>Available Rooms</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Room ID</TableCell>
              <TableCell align="center">Room Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableRooms.map((row) => (
              <TableRow key={row.room_id}>
                {Object.getOwnPropertyNames(row).map((attribute) => (
                  <TableCell key={attribute} align="center">{row[attribute]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AvailableRooms;