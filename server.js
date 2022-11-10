const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const cors = require("cors");

const routesStudents = require("./routesStudents");
const routesActivities = require("./routesActivities");
const routesStats = require("./routesStats");

// AWS port 3306
// admin .J853brayan777 
const app = express();
app.set("port", process.env.PORT || 9000);
const dbOptions = {
  host: "slecu-db.cqauonprn9tl.us-east-1.rds.amazonaws.com",
  port: 3306, // Default port
  user: "admin",
  password: "J853brayan777",
  database: "slecu-db",
};

// Middelwares
app.use(myconn(mysql, dbOptions, "single")); // Pull or request
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
app.use("/students", routesStudents);
app.use("/activities", routesActivities);
app.use("/stats", routesStats);

// Server running
app.listen(app.get("port"), () => {
  console.log("server running on port", app.get("port"));
});
