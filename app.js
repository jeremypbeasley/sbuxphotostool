// Dependencies

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
var http = require("http");
var request = require('request');
var _ = require("lodash");
var $ = require("jquery");
var getJSON = require('get-json');
var fs = require('fs');
var util = require('util')


// Initialize / Routing

app.get("/", function(req, res) {
  res.render("index.ejs");
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

function name() {

}

function storeLocally (content) {
  // get disk file
  fs.readFile('public/mock.json', 'utf8', function readFileCallback(err, result) {
    if (err) {
      //console.log(err);
      return;
    }
    const existingEntries = JSON.parse(result);
    const newEntries = content;
    // loop through new items
    for(var i = 0; i < newEntries.items.length; i++) {
      // see if the new item id exists in existing
      console.log(i + " ——————————————————————————————————————————");
      let theswitch = _.filter(existingEntries.items, { 'id': newEntries.items[i].id });
      if ( theswitch.length >= 1) {
        console.log("---MATCH---");
        console.log(theswitch);
      }
      if ( theswitch.length <= 0 ) {
        console.log("---NO MATCH---");
        console.log("NEW: " + newEntries.items[i].id + " / " + newEntries.items[i].name);
      }
    }
      // if (theswitch) {
      //   // do nothing
      //   console.log("#" + i + ": EXISTING ITEM");
      //   // return;
      // } else {
      //   console.log("#" + i + ": NEW ITEM");
      // }
      // make a new item

      // return {
      //   id: newEntries.items[i].id,
      //   image_url: newEntries.items[i].content,
      //   name: newEntries.items[i].name,
      //   created_at: newEntries.items[i].created_at,
      //   updated_at: newEntries.items[i].updated_at,
      //   croperties: {
      //     rectangle: "default",
      //     square: "default",
      //     circle: "default"
      //   }
      // }
    //}

    // _.map(newEntries, function() {
    //   console.log(newEntries[i].id);
    // });
      // .map(item => {
      //   for(var i = 0; i < existingData.items.length; i++) {
      //     // check if the Dropmark item already exists on disk
      //     if (existingData.items[i].id !== item.id) {
      //       // console.log("EXISTING: " + existingData.items[i].id);
      //       // console.log("NEW: " + item.id);
      //       // console.log("————————————");
      //       // it's a new item
      //       return {
      //         id: item.id,
      //         image_url: item.content,
      //         name: item.name,
      //         created_at: item.created_at,
      //         updated_at: item.updated_at,
      //         croperties: {
      //           rectangle: "default",
      //           square: "default",
      //           circle: "default"
      //         }
      //       };
      //     } else {
      //       // it's not a new item
      //       //console.log("STATUS: Existing Item");
      //       return;
      //     }
      //   }
      // })
      // .filter(item => item);
    // combine both objects
    //existingData.items = existingData.items.concat(newEntries);
    // write to the file
    //fs.writeFile('public/mock.json', JSON.stringify(existingData))
  });
}

app.get('/api/photos', (req, res) => {
  const options = {
    'auth': {
      'user': process.env.DROPMARK_USER,
      'pass': process.env.DROPMARK_PASS,
      'sendImmediately': false
    }
  };
  request.get("http://app.dropmark.com/" + process.env.DROPMARK_COLLECTION_ID + ".json?key=" + process.env.DROPMARK_KEY + "&callback=?", options, function (err, result) {
    if (err) {
      console.log(err);
      res.send("you no good...");
      return;
    }
    const bodyStr = result.body.slice(1, result.body.length - 1);
    const body = JSON.parse(bodyStr);
    storeLocally(body);
    res.send(body);
  });
});

app.get('/api/croperties', (req, res) => {
  fs.readFile('public/croperties.json', 'utf8', function readFileCallback(err, result) {
    let body = JSON.parse(result);
    res.send(body);
  })
});

// 404

app.use(function (req, res) {
    res.render('404.ejs');
});
