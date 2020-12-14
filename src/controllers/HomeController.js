// const request = require("request");
const mysql = require("mysql");
const config = require(".././config/Database/database");

module.exports = {
  index: function(req, res, next) {
   
      res.render('index')
  },

  home: function(req, res, next) {
    let db = mysql.createConnection(config);

    db.connect();

    db.query(
      `SELECT * FROM task WHERE belongs_to=${req.user.id}`,
      (err, rows, fields) => {

        res.render("task", {
          isAuthenticated: req.isAuthenticated(),
          user: req.user,
          data: rows
        });
      }
    );

    // res.render("task");
  }
};
