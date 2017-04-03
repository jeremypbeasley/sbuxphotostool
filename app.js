// Dependencies

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
// var _ = require("lodash");
var $ = require("jquery");
var getJSON = require('get-json');


// Initialize / Routing

app.get("/", function(req, res) {
  res.render("index.ejs")
  console.log('Listening at http://localhost:2401/')
})

// Listening

app.listen(process.env.PORT || 2401);


// API ////////////////////////////////////////////////////////////////////

app.get('/api/users', (req, res) => {
  db.collection('users')
    .find()
    .toArray((err, result) => {
      if (err) { return console.log(err); }
      res.send(result);
    });
});

// http://app.dropmark.com/336137.json?key=638be65e149826ec8892&callback=?

app.get('/api/photos', (req, res) => {
  var request = require('request');
  request("http://app.dropmark.com/" + process.env.DROPMARK_COLLECTION_ID + ".json?key=" + process.env.DROPMARK_KEY + "&callback=?", function (err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
});

// 404

app.use(function (req, res) {
    res.render('404.ejs');
});
