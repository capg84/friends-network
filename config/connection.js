const { connect, connection } = require("mongoose");

connect("mongodb://localhost/friendsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
