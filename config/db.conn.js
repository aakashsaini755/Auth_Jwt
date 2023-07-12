const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database Connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = ConnectDB;