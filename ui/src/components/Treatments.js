import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { baseURL } from '../config';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Treatment = () => {
  const classes = useStyles();
  const [treatment, setTreatment] = useState([]);
  const [unfinishedTreatment, setUnfinishedTreatment] = useState([]);

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    fetch(baseURL + '/treatment')
      .then(res => res.json())
      .then(
        (result) => setTreatment(result),
        (error) => console.log(error)
      )
  }, [])

  useEffect(() => {
    fetch(baseURL + '/unfinishedTreatment')
      .then(res => res.json())
      .then(
        (result) => setUnfinishedTreatment(result),
        (error) => console.log(error)
      )
  }, [])

  return (
    <>
      <h1>Treatment Types</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Treatment ID</TableCell>
              <TableCell align="center">Period</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {treatment.map((row) => (
              <TableRow key={row.treatment_id}>
                {Object.getOwnPropertyNames(row).map((attribute) => (
                  <TableCell key={attribute} align="center">{row[attribute]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Show Ongoing Treatments"
      />
      {checked ? (
        <>
          <h1>Unfinished Treatments of Patients</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Treatment ID</TableCell>
                  <TableCell align="center">Patient Name</TableCell>
                  <TableCell align="center">Discard Date</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Period</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unfinishedTreatment.map((row) => (
                  <TableRow key={row.treatment_id}>
                    {Object.getOwnPropertyNames(row).map((attribute) => (
                      <TableCell key={attribute} align="center">{row[attribute]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </>
  );
}

export default Treatment;