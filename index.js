const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Gokul@003',
    database: 'screening',
});


app.post('/register',(req,res)=>{
    const firstname = req.body?.firstname;
    const lastname = req.body?.lastname;
    const dob = req.body?.dob;
    const age = req.body?.age;
    const gender = req.body?.gender;
    const email = req.body?.email;
    const backupemail = req.body?.backupemail;
    const contact = req.body?.contact;
    const address = req.body?.address;
    const ncompany = req.body?.ncompany;
    const companyname = req.body?.companyname;
    const wages = req.body?.wages;
    const resume = req.body?.resume;
    const country = req.body?.country;
    const job = req.body?.job;
    const adopt = req.body?.adopt;

    console.log(req.body);

    db.query('INSERT INTO register (firstname,lastname,dob,age,gender,email,backupemail,contact,address,ncompany,companyname,wages,resume,country,job,adopt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [firstname,lastname,dob,age,gender,email,backupemail,contact,address,ncompany,companyname,wages,resume,country,job,adopt]
    )

})

app.get('/employeelist' , (req,res) => {
    db.query("SELECT * FROM register", 
    (err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    )
})

app.put("/updateEmployee/:id", (req, res) => {
    const id = req.params.id;
    const updatedEmployee = {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        gender: req.body?.gender,
        country: req.body?.country,
        contact: req.body?.contact,
        wages: req.body?.wages,
        job: req.body?.job,
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
  

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM register WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


app.listen(5000, () => {
    console.log('Server started');
});
