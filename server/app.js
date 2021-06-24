const express = require('express')
const mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hospital'
});

const app = express()
const port = 3001

// add these to get request body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

connection.connect(error => {
  if (error)
    throw error;
  console.log("Successfully connected to the database.");
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/availableRooms', (req, res) => {
  const query = `SELECT * from available_rooms`;

  connection.query(query, function (err, results) {
    if (err)
      throw err;
    console.log('Fetched succesfully');
    results = results.map(v => Object.assign({}, v));
    console.log(results);
    res.json(results);
  });

})

app.get('/addresses', (req, res) => {
  const query = `SELECT * from address`;

  connection.query(query, function (err, results) {
    if (err)
      throw err;
    console.log('Fetched succesfully');
    results = results.map(v => Object.assign({}, v));
    console.log(results);
    res.json(results);
  });

})

app.get('/unfinishedTreatment', (req, res) => {
  const query = `select * from unfinished_treatments;`;

  connection.query(query, function (err, results) {
    if (err)
      throw err;
    console.log('Fetched succesfully');
    results = results.map(v => Object.assign({}, v));
    console.log(results);
    res.json(results);
  });

})

app.get('/treatment', (req, res) => {
  const query = `SELECT * from treatment`;

  connection.query(query, function (err, results) {
    if (err)
      throw err;
    console.log('Fetched succesfully');
    results = results.map(v => Object.assign({}, v));
    console.log(results);
    res.json(results);
  });
})

app.get('/doctors', (req, res) => {
  const query = `SELECT * from hospital.doctor`;

  connection.query(query, function (err, results) {
    if (err)
      throw err;
    console.log('Fetched succesfully');
    results = results.map(v => Object.assign({}, v));
    console.log(results);
    res.json(results);
  });

  // TODO: res.error
})

app.get('/nurses', (req, res) => {
  const query = `SELECT * from hospital.nurse`;

  connection.query(query, function (err, results) {
    if (err)
      throw err;
    console.log('Fetched succesfully');
    results = results.map(v => Object.assign({}, v));
    console.log(results);
    res.json(results);
  });

})

app.get('/employees', (req, res) => {
  const query = `SELECT * from hospital.employee`;

  connection.query(query, function (err, results) {
    if (err)
      throw err;
    console.log('Fetched succesfully');
    results = results.map(v => Object.assign({}, v));
    console.log(results);
    res.json(results);
  });

})

app.get('/patients', (req, res) => {
  const query = `SELECT * from hospital.patient`;

  connection.query(query, function (err, results) {
    if (err)
      throw err;
    console.log('Fetched succesfully');
    results = results.map(v => Object.assign({}, v));
    console.log(results);
    res.json(results);
  });

})

app.delete('/doctor', (req, res) => {
  const id = req.query.doctorId;
  const query = `DELETE FROM hospital.doctor WHERE doctor_id=${id}`;

  connection.query(query, function (err, results) {
    if (err) {
      console.log(err.message);
      res.json({ success: false, message: 'Error when deleting doctor' });
    } else {
      const result = {
        success: true,
        message: `Deleted doctor with id=${id} successfully`,
      }
      console.log(result.message);
      res.json(result);
    }
  });

})

app.post('/patient', (req, res) => {
  const { patientName, identityNumber, sex, contactNo, companionNo, admitDate, discardDate } = req.body;
  const values = [identityNumber, patientName, sex, contactNo, companionNo, admitDate, discardDate];
  const query = `INSERT INTO hospital.patient (identity_number, patient_name, sex, contact_no, companion_no, admit_date, discard_date) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, values, function (err) {
    if (err) {
      console.log(err.message);
      res.json({ success: false, message: 'Error when inserting patient' });
    } else {
      const result = {
        success: true,
        message: `Added new patient successfully`,
      }
      console.log(result.message);
      res.json(result);
    }
  });

})

app.put('/patient', (req, res) => {
  const id = req.query.patientId;
  const { patientName, identityNumber, sex, contactNo, companionNo, admitDate, discardDate } = req.body;
  const values = [identityNumber, patientName, sex, contactNo, companionNo, admitDate, discardDate];
  const query = `UPDATE hospital.patient SET identity_number = ?, patient_name = ?, sex = ?, contact_no = ?, companion_no = ?, admit_date = ?, discard_date = ? WHERE patient_id = ${id}`;

  connection.query(query, values, function (err) {
    if (err) {
      console.log(err.message);
      res.json({ success: false, message: 'Error when updating patient' });
    }
    else {
      const result = {
        success: true,
        message: `Updated patient with id=${id} successfully`,
      }
      console.log(result.message);
      res.json(result);
    }
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
