import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { baseURL } from '../config';

// TODO: her bir tablo bileseni duplicated sekilde yazilmayabilir.

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Employees = () => {
  const classes = useStyles();
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetch(baseURL + '/doctors')
      .then(res => res.json())
      .then(
        (result) => setDoctors(result),
        (error) => console.log(error)
      )

      fetch(baseURL + '/nurses')
      .then(res => res.json())
      .then(
        (result) => setNurses(result),
        (error) => console.log(error)
      )

      fetch(baseURL + '/employees')
      .then(res => res.json())
      .then(
        (result) => setEmployees(result),
        (error) => console.log(error)
      )
    }

    return function cleanUp() {
      mounted = false;
    }
  }, []);

  const deleteDoctor = (doctor) => {
    console.log('---');
    const doctorsTemp = [...doctors]; // make a separate copy of the array
    const index = doctorsTemp.indexOf(doctor)
    if (index !== -1) {
      const id = doctorsTemp[index].doctor_id;
      const emp_id = doctorsTemp[index].employee_id;
      const emp_index = employees.findIndex((e) => e.employee_id === emp_id)
      const employeesTemp = [...employees];
      if (emp_index !== -1){
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        };
        fetch(baseURL + `/doctor?doctorId=${id}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            if (result.success) {
              doctorsTemp.splice(index, 1);
              employeesTemp.splice(emp_index, 1);
              setDoctors(doctorsTemp);
              setEmployees(employeesTemp);
            } else {
              console.log(`Cannot delete doctor with id=${id}`);
            }
          },
          (error) => console.log(error)
        );
      }
    }
  };

  return (
    <>
      <h1>Doctors</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Doctor ID</TableCell>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">Position</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.doctor_id}>
                {Object.getOwnPropertyNames(doctor).map((attribute) => (
                  <TableCell key={attribute} align="center">{doctor[attribute]}</TableCell>
                ))}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteDoctor(doctor)}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1>Nurses</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nurse ID</TableCell>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">Room ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nurses.map((nurse) => (
              <TableRow key={nurse.nurse_id}>
                {Object.getOwnPropertyNames(nurse).map((attribute) => (
                  <TableCell key={attribute} align="center">{nurse[attribute]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1>Employee</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">Contact No</TableCell>
              <TableCell align="center">Address ID</TableCell>
              <TableCell align="center">Employee Name</TableCell>
              <TableCell align="center">Sex</TableCell>
              <TableCell align="center">Base Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employee_id}>
                {Object.getOwnPropertyNames(employee).map((attribute) => (
                  <TableCell key={attribute} align="center">{employee[attribute]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Employees;