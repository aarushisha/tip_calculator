var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
})

db.connect();

db.query('CREATE DATABASE IF NOT EXISTS tips', function(error, results) {
  if (error) {
    console.log('error in creating database-------------', error);
  } else {
    console.log('created database---------------');
  }
})

db.query('USE tips', function(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log('using database tips!')
  }
})

db.query('CREATE TABLE IF NOT EXISTS costs (name VARCHAR (25), price DECIMAL (5,2), percent SMALLINT, tip DECIMAL(5,2), total DECIMAL (5,2))', function(error, results) {
  if (error) {
    console.log('error in creating table--------------', error);
  } else {
    console.log('table created---------')
  }
});

getValues = (callback) => {
  db.query(`SELECT * FROM costs;`, function(error, results) {
    if (error) {
      console.log(error);
    } else {
      callback(results);
    }
  })

}

addValue = (obj,  callback) => {
  db.query(`INSERT INTO costs (name, price, percent, tip, total) VALUES ("${obj.name}", ${obj.price}, ${obj.percent}, ${obj.tip}, ${obj.total});`, function(error, results) {
    if (error) {
      console.log('error while inserting into table--------------', error);
    } else {
      console.log('results in db---------------------', results);
    }
  })
}



module.exports.db = db;
module.exports.addValue = addValue;
module.exports.getValues = getValues;