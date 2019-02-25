const express = require("express");
const connect = require("./connect");

const app = express();

const PORT = 3000;

let db;

app.get("/", (req, res, next) => {
  let myData = db.collection("myData");

  myData.find({}).toArray((err, docs) => {
    if (err) throw err;

    docs.forEach(function(doc) {
      console.log(doc);
    });
    res.json({ result: docs });
  });
});

app.post("/", (req, res, next) => {
  let myData = db.collection("myData");

  myData.insert(
    {
      id: 11,
      first_name: "Kim",
      last_name: "McGrath",
      email: "kimmyg@gizmodo.com",
      score: 100
    },
    (err, result) => {
      if (err) throw err;

      res.json({ result });
    }
  );
});

connect("test").then(database => {
  db = database;
  app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
});
