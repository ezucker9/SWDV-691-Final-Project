var mysql = require("mysql");

module.exports = {
  getSignUp: function(req, res, next) {
    res.render("signup", { err: req.flash("ErrorEmail") });
  },

  postSignUp: function(req, res, next) {
    var config = require("../config/Database/database");

    db = mysql.createConnection(config);

    db.connect();

    db.query(
      `SELECT email FROM user WHERE email='${req.body.email}'`,
      (err, row, fields) => {
        if (err) throw err;


     
        if (row.length > 0) {
            if(row[0].email == req.body.email){
                req.flash(
                    "ErrorEmail",
                    "Introduce another email"
                  );
                  res.redirect("/signup");
            }
         
        } else {
        
          let user = {
        
            email: req.body.email,
            password: req.body.password,
         
          };

          db.query("INSERT INTO user SET ?", user, (err, rows, fields) => {
            if (err) throw err;

            req.flash(
              "info",
              "Sign Up succesfull"
            );
            res.redirect("/login");
          });
        }
      }
    );
  },

  getSignIn: function(req, res, next) {
    res.render("index", {
      message: req.flash("info"),
      authMessage: req.flash("loginMessage")
    });
  },

  logout: function(req, res, next) {
    req.logout();

    res.redirect("/login");
  }
};
