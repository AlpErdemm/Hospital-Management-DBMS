const express = require('express')
const mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hospital'
});

const app = express()
const port = 3000

// add these to get request body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// mock data
const db = require('./db.json')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/availableRooms', (req, res) => {
  const query = `SELECT * from available_rooms`;
  connection.connect(function (err) {
    if (err)
      throw err;
    console.log('Connected succesfully');
    connection.query(query, function (err, results) {
      if (err)
        throw err;
      console.log('Fetched succesfully');
      results = results.map(v => Object.assign({}, v));
      console.log(results);
      res.send(JSON.stringify(results));
    });
  });
})

app.get('/doctors', (req, res) => {
  const query = `SELECT * from hospital.doctor`;
  connection.connect(function (err) {
    if (err)
      throw err;
    console.log('Connected succesfully');
    connection.query(query, function (err, results) {
      if (err)
        throw err;
      console.log('Fetched succesfully');
      results = results.map(v => Object.assign({}, v));
      console.log(results);
      res.send(JSON.stringify(results));
    });
  });
  // TODO: res.error
})

app.get('/nurses', (req, res) => {
  const query = `SELECT * from hospital.nurse`;
  connection.connect(function (err) {
    if (err)
      throw err;
    console.log('Connected succesfully');
    connection.query(query, function (err, results) {
      if (err)
        throw err;
      console.log('Fetched succesfully');
      results = results.map(v => Object.assign({}, v));
      console.log(results);
      res.send(JSON.stringify(results));
    });
  });
})

app.get('/employees', (req, res) => {
  const query = `SELECT * from hospital.employee`;
  connection.connect(function (err) {
    if (err)
      throw err;
    console.log('Connected succesfully');
    connection.query(query, function (err, results) {
      if (err)
        throw err;
      console.log('Fetched succesfully');
      results = results.map(v => Object.assign({}, v));
      console.log(results);
      res.send(JSON.stringify(results));
    });
  });
})

app.get('/patients', (req, res) => {
  const query = `SELECT * from hospital.patient`;
  connection.connect(function (err) {
    if (err)
      throw err;
    console.log('Connected succesfully');
    connection.query(query, function (err, results) {
      if (err)
        throw err;
      console.log('Fetched succesfully');
      results = results.map(v => Object.assign({}, v));
      console.log(results);
      res.send(JSON.stringify(results));
    });
  });
})

app.delete('/doctor', (req, res) => {
  const id = req.query.doctorId;
  const query = `DELETE FROM hospital.doctor WHERE doctor_id=${id}`;
  connection.connect(function (err) {
    if (err)
      throw err;
    console.log('Connected succesfully');
    connection.query(query, function (err, results) {
      if (err)
        throw err;
      const result = {
        success: true,
        message: `Deleted doctor with id=${id} successfully`,
      }
      console.log(result.message);
      res.send(JSON.stringify(result));
    });
  });
})

app.post('/patient', (req, res) => {
  const { patientName, identityNumber, sex, contactNo, companionNo, admitDate, discardDate } = req.body;
  const values = [identityNumber, patientName, sex, contactNo, companionNo, admitDate, discardDate];
  const query = `INSERT INTO hospital.patient (identity_number, patient_name, sex, contact_no, companion_no, admit_date, discard_date) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  connection.connect(function (err) {
    if (err)
      throw err;
    console.log('Connected succesfully');
    connection.query(query, values, function (err, results) {
      if (err)
        throw err;
      const result = {
        success: true,
        message: `Added new patient successfully`,
      }
      console.log(result.message);
      res.send(JSON.stringify(result));
    });
  });
})

app.put('/patient', (req, res) => {
  const id = req.query.patientId;
  const { patientName, identityNumber, sex, contactNo, companionNo, admitDate, discardDate } = req.body;
  const values = [identityNumber, patientName, sex, contactNo, companionNo, admitDate, discardDate];
  const query = `UPDATE hospital.patient SET identity_number = ?, patient_name = ?, sex = ?, contact_no = ?, companion_no = ?, admit_date = ?, discard_date = ? WHERE patient_id = ${id}`;
  connection.connect(function (err) {
    if (err)
      throw err;
    console.log('Connected succesfully');
    connection.query(query, values, function (err, results) {
      if (err)
        throw err;
      const result = {
        success: true,
        message: `Updated patient with id=${id} successfully`,
      }
      console.log(result.message);
      res.send(JSON.stringify(result));
    });
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})