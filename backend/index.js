const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const passportJwtStrategy = require("./config/passport-jwt-strategy");
connectDB();
const port = process.env.PORT || 8000;

// for routes to accept the json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes configuration
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});
