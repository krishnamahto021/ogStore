const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");
const passportJwtStrategy = require("./config/passport-jwt-strategy");
connectDB();
const port = process.env.PORT || 8000;

// for routes to accept the json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes configuration
app.use("/", require("./routes"));

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running on development");
  });
}

/*---------------------DEPLOYMENT-----------------------*/

app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});
