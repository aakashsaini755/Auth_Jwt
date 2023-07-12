const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require('dotenv').config();
const ConnectDB = require("./config/db.conn");
ConnectDB();
const app = express();
// const contactRoute = require("./routes/contactRoute")

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/contacts",require("./routes/contactRoute"));
app.use("/api/auth",require("./routes/userRoute"));

app.use(errorHandler);

app.listen(port,console.log(`Server running on port ${port}..`))