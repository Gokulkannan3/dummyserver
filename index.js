const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
    user: 'avnadmin',
    host: 'mysql-39af648c-gokul.a.aivencloud.com',
    password: 'AVNS_5W135YZrjuwuLR-WHt5',
    database: 'library',
    port:'11941',
});

app.post('/register', (req, res) => {
    const {
        firstname,
        lastname,
        dob,
        age,
        gender,
        email,
        contact,
        wages,
        country,
        job
    } = req.body;

    db.query('INSERT INTO register (firstname, lastname, dob, age, gender, email, contact, wages, country, job) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [firstname, lastname, dob, age, gender, email, contact, wages, country, job],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(200).json({ insertId: result.insertId });
            }
        }
    );
});

app.get('/employeelist', (req, res) => {
    db.query("SELECT * FROM register",
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateEmployee/:id", (req, res) => {
    const id = req.params.id;
    const updatedEmployee = {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        gender: req.body?.gender,
        country: req.body?.country,
        contact: req.body?.contact,
        wages: req.body?.wages,
        job: req.body?.job
    };

    db.query(
        "UPDATE register SET ? WHERE id = ?",
        [updatedEmployee, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error updating employee");
            } else {
                res.send(result);
            }
        }
    );
});
app.post('/update', (req, res) => {
  const {
      address,
      degree,
      college,
      twelth,
      tenth
  } = req.body;

  db.query("SELECT id FROM register ORDER BY id DESC LIMIT 1", (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
      } else {
          const lastEmployeeId = result[0].id;
          db.query(
              "UPDATE register SET address = ?, degree = ?, college = ?, twelth = ?, tenth = ? WHERE id = ?",
              [address, degree, college, twelth, tenth, lastEmployeeId],
              (err, result) => {
                  if (err) {
                      console.log(err);
                      res.status(500).send('Internal Server Error');
                  } else {
                      res.status(200).json({ message: 'Employee details updated successfully' });
                  }
              }
          );
      }
  });
});


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM register WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

app.listen(5000, () => {
    console.log('Server started');
});
