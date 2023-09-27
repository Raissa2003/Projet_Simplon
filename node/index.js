const express = require("express")
const mysql = require ('mysql2');
const cors = require('cors');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    //port:8000,
    database: "simplon_bd",
});
//conncter a table participant 
db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM participant", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});

/*************** */
const app = express();
app.use(cors());

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

const PORT = 5000;

app.get("/", function(req, res, next){
    res.json({ message: "L'API marche bien" })
});
    
//afficher les données
app.get('/api/participant/:id', (req,res)=>{

    const id = req.params.id;
    const mysql = "SELECT * FROM participant WHERE id=?";

     db.execute(mysql,[id], (err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else
          return res.status(500).json(err);
     })
})

app.get('/api/participant', (req,res)=>{

  const mysql = "SELECT * FROM participant ";

  db.execute(mysql, (err,results)=>{
     if(!err){
          return res.status(200).json(results);
     }else
          return res.status(500).json(err);
  })
})

// demarrer le serveur
app.listen(PORT, function(){
    console.log("L'application est demarré au port: " + PORT)
});
