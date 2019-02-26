const mongodb = require("mongodb");

let uri =
  "mongodb+srv://appservice:apps3rv1c3@cluster0-k3ydo.mongodb.net/test?retryWrites=true";
function connect(database) {
  return mongodb.MongoClient.connect(uri).then(client => {
    return client.db(database);
  });
}

module.exports = connect;
