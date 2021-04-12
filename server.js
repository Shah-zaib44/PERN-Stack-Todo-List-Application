const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:3000",
// };corsOptions

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Frontend/build")));

// required to serve SPA on heroku production without routing problems; it will skip only 'api' calls

const db = require("./app/models");
db.sequelize.sync();
// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Hi" });
// });
require("./app/routes/todoList")(app);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/build/index.html"));
});
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
