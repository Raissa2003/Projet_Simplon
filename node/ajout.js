const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware pour analyser les données JSON
app.use(bodyParser.json());
app.use(cors());

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

// Route pour ajouter un participant
app.post('/participants', (req, res) => {
  const { nom, prenom, num_tel, mail } = req.body;

  // Requête SQL pour insérer un participant dans la base de données
  const sql = 'INSERT INTO participant (nom, prenom, num_tel, mail) VALUES (?, ?, ?, ?)';
  const values = [nom, prenom, num_tel, mail];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du participant :', err);
      res.status(500).json({ message: 'Erreur lors de l\'ajout du participant' });
      return;
    }

    console.log('Participant ajouté avec succès');
    res.status(201).json({ message: 'Participant ajouté avec succès' });
  });
});

// Démarrage du serveur
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
