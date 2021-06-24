import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { baseURL } from '../config';

// TODO: Header'lari da tek tek yazmadan al.

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    width: '100%',
    display: 'inline-block',
  },
  button: {
    float: 'right',
  },
  header: {
    float: 'left',
  },
  form: {
    width: "60%",
  },
  submit: {
    marginTop: 30,
  },
});

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [operationTitle, setOperationTitle] = useState('');
  const [updatedId, setUpdatedId] = useState(null);
  const [patientName, setPatientName] = React.useState('');
  const [identityNumber, setIdentityNumber] = React.useState('');
  const [sex, setSex] = React.useState('empty');
  const [contactNo, setContactNo] = React.useState('');
  const [companionNo, setCompanionNo] = React.useState('');
  const [admitDate, setAdmitDate] = React.useState('');
  const [discardDate, setDiscardDate] = React.useState('');

  useEffect(() => {
    fetch(baseURL + '/patients')
      .then(res => res.json())
      .then(
        (result) => setPatients(result),
        (error) => console.log(error)
      )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // use for request body
    const form = {
      patientName,
      identityNumber,
      sex,
      contactNo,
      companionNo,
      admitDate,
      discardDate
    };

    if (updatedId) {
      const tempPatients = [...patients];
      const i = tempPatients.findIndex(p => p.patient_id === updatedId);
      if (i !== -1) {
        console.log('send req for update, use the form object');

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        };
        fetch(baseURL + `/patient?patientId=${tempPatients[i].patient_id}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            if (result.success) {
              tempPatients[i].patient_name = form.patientName;
              tempPatients[i].identity_number = form.identityNumber;
              tempPatients[i].sex = form.sex;
              tempPatients[i].contact_no = form.contactNo;
              tempPatients[i].companion_no = form.companionNo;
              tempPatients[i].admit_date = form.admitDate;
              tempPatients[i].discard_date = form.discardDate;
              setPatients(tempPatients);
              alert('Updated patient successfully.');
            } else {
              alert('Cannot update the patient');
            }
          },
          (error) => console.log(error)
        );

      }
    } else {
      console.log('send req for insert, use the form object');

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      };
      fetch(baseURL + '/patient', requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.success) {
            alert('Added new patient successfully!, Reload the page.');
          } else {
            alert('Cannot insert new patient');
          }
        },
        (error) => console.log(error)
      );

    }
    setUpdatedId(null);
    setShowForm(false);
  };

  const updatePatient = (patientId) => {
    setOperationTitle('Edit Patient');

    const patient = patients.find(p => p.patient_id === patientId);
    
    if (patient) {
      setPatientName(patient.patient_name);
      setIdentityNumber(patient.identity_number);
      setSex(patient.sex);
      setContactNo(patient.contact_no);
      setCompanionNo(patient.companion_no);
      setAdmitDate(patient.admit_date);
      setDiscardDate(patient.discard_date);
      setUpdatedId(patientId);
      setShowForm(true);
    }
  };
  
  const onClickAdd = () => {
    setOperationTitle('New Patient');

    // reset form elements
    setPatientName('');
    setIdentityNumber('');
    setSex('empty');
    setContactNo('');
    setCompanionNo('');
    setAdmitDate('');
    setDiscardDate('');
    setUpdatedId(null);
    setShowForm(true);

    // TODO: add in table ui as well.
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.header}>Patients</h1>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onClickAdd}
        >
          Add
        </Button>

      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Patient ID</TableCell>
              <TableCell align="center">Identity Number</TableCell>
              <TableCell align="center">Patient Name</TableCell>
              <TableCell align="center">Sex</TableCell>
              <TableCell align="center">Contact No</TableCell>
              <TableCell align="center">Companion No</TableCell>
              <TableCell align="center">Admit Date</TableCell>
              <TableCell align="center">Discard Date</TableCell>
              <TableCell align="center">Room ID</TableCell>
              <TableCell align="center">Treatment ID</TableCell>
              <TableCell align="center">Doctor ID</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.patient_id}>
                {Object.getOwnPropertyNames(patient).map((attribute) => (
                  <TableCell key={attribute} align="center">{patient[attribute]}</TableCell>
                ))}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => updatePatient(patient.patient_id)}
                  >
                    update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        showForm ? (
          <>
          <h3 className={classes.header}>{operationTitle}</h3>
          <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={5}>
                <TextField
                  name="patientName"
                  variant="outlined"
                  required
                  fullWidth
                  id="patientName"
                  label="Patient Name"
                  autoFocus
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="identityNumber"
                  label="Identity Number"
                  name="identityNumber"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Sex</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    label="Sex"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="empty"><em>Empty</em></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contactNo"
                  variant="outlined"
                  required
                  fullWidth
                  id="contactNo"
                  label="Contact No"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="companionNo"
                  label="Companion No"
                  name="companionNo"
                  value={companionNo}
                  onChange={(e) => setCompanionNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="admitDate"
                  variant="outlined"
                  required
                  fullWidth
                  id="admitDate"
                  label="Admit Date"
                  value={admitDate}
                  onChange={(e) => setAdmitDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="discardDate"
                  label="Discard Date"
                  name="discardDate"
                  value={discardDate}
                  onChange={(e) => setDiscardDate(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          </>
        ) : null
      }
    </>
  );
}

export default Patients;