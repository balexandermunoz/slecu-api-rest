const express = require("express");
const routes = express.Router();

// Routes

// Get 10 students with most activities:
routes.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      `SELECT studentid, COUNT(*) AS count
        FROM activities
        GROUP BY studentid
        ORDER BY count DESC
        LIMIT 10`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// Get 10 students with the higest average value
routes.get("/value", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      `SELECT studentid, AVG(value) AS avg
      FROM activities
      GROUP BY studentid
      ORDER BY avg desc
      LIMIT 10;`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// Get average value of all students
routes.get("/avg", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT AVG(value) AS avg FROM activities;", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});
module.exports = routes;
