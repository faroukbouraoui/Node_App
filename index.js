const mysql = require("mysql");
var MySQLEvents = require('mysql-events');

console.log('hello world');

const _dbhostname_ = 'localhost';
const _dbusername_ = 'root';
const _dbpassword_ = '';


var dsn = {
  host: _dbhostname_,
  user: _dbusername_,
  password: _dbpassword_,
};

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elfilahiya',
  port: 3306
});

var mysqlEventWatcher = MySQLEvents(dsn);

var watcher = mysqlEventWatcher.add(
  'stec',
  function (oldRow, newRow, event) {
    //row inserted
    if (oldRow === null) {
      //insert code goes here
      //console.log(newRow);
      let produit = {
        id: newRow.fields.id,
        categorie: newRow.fields.categorie,
        fournisseur: newRow.fields.fournisseur,
        designation: newRow.fields.designation,
        description: newRow.fields.description,
        image: newRow.fields.image,
        prix: newRow.fields.prix
      }

      console.log(produit);
      let sql = "Insert into produit VALUES ('"+produit.id+"','"+produit.categorie+"',"+produit.fournisseur+",'"+produit.designation+"','"+produit.description+"','"+produit.image+"',"+produit.prix+")";
      connection.query(sql);
      connection.end();

    }

    //row deleted
    if (newRow === null) {
      //delete code goes here
      console.log(oldRow);

    }

    //row updated
    if (oldRow !== null && newRow !== null) {
      //update code goes here
    }

    //detailed event information
    //console.log(event)
  },
  'match this string or regex'
);