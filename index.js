const express = require("express");
const bodyParser = require("body-parser");

const connect = require("./connect");

const app = express();

const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let db;

app.get("/players", (req, res, next) => {
  let myData = db.collection("myData");

  myData.find({}).toArray((err, players) => {
    if (err) {
      return res.status(500).json({ error: err, message: "Unlucky" });
    }

    players.forEach(function(doc) {
      console.log(doc);
    });
    res.json({
      payload: players
    });
  });
});

app.get("/players/:id", (req, res, next) => {
  const { id } = req.params;
  let myData = db.collection("myData");

  myData.find({ id: Number(id) }).toArray((err, players) => {
    if (err) {
      return res.status(500).json({ error: err, message: "Unlucky" });
    }

    console.log(players);
    res.json({
      payload: players[0]
    });
  });
});

app.post("/players", (req, res, next) => {
  let myData = db.collection("myData");
  if (typeof req.body.first_name !== "string") {
    return res.status(422).json({ error: "No name" });
  }
  const { first_name, last_name, email } = req.body;
  const data = {
    first_name,
    last_name,
    email,
    id: getId(),
    score: 0
  };
  myData.insert(data, (err, result) => {
    if (err) throw err;

    res.status(201).json({ payload: result.ops[0] });
  });
});

connect("test").then(database => {
  db = database;
  app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const connect = require("./connect");

// const app = express(); //initialise expresss

// const PORT = 3000;

// let db; //like a global variable, otherwise would have to connect in each function

// app.use(bodyParser.json()) //to be able to use the body //needs to be above get request //needs to be json

// app.get("/", (req, res, next) => {
//   let myData = db.collection("myData"); //myData is name of collection in mongo

//   myData.find({}).toArray((err, docs) => {
//     //giving it the empty object ({}) finds everything //.toArray to return us an array
//     if (err) throw err; ///(err, docs) is the call back function

//     docs.forEach(function(doc) {
//       console.log(doc);
//     });
//     res.json({ result: docs });
//   });
// });

// app.post("/", (req, res, next) => { //"/" defines a route
//   let myData = db.collection("myData"); // post request has a body - can think of it like a form
// const data = req.body;

//   myData.insert(
//     { req.body,  //need middleware to attach a body to the request body-parser -npm install body-parser
//       // id: 11,  this is hard coding it in -- want to have variable so can change info being updated
//       // first_name: "Kim",   //can create body (new info) in postman
//       // last_name: "McGrath",
//       // email: "kimmyg@gizmodo.com",
//       // score: 100
//     },
//     (err, result) => {
//       if (err) throw err;

//       res.json({ result });
//     }
//   );
// });

// // app.patch("id/11", (req, res, next) => {
// //   let myData = db.collection("myData");

// //   myData.update();
// //   {
// //     last_name: "Follett";
// //   }
// //   res.json({ result });
// // });

// connect("test").then(database => {
//   db = database;
//   app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
// });
// //
// //app.listen goes in function because now it will only listen/accept requests once we are connected to a database.
