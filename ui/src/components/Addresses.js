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

const Adresses = () => {
  const classes = useStyles();
  const [adresses, setAddresses] = useState([]);

  useEffect(() => {
    fetch(baseURL + '/addresses')
      .then(res => res.json())
      .then(
        (result) => setAddresses(result),
        (error) => console.log(error)
      )
  }, [])

  return (
    <>
      <h1>Adresses</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Address ID</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Town</TableCell>
              <TableCell align="center">Street</TableCell>
              <TableCell align="center">Apt No</TableCell>
              <TableCell align="center">Door</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adresses.map((row) => (
              <TableRow key={row.address_id}>
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

export default Adresses;