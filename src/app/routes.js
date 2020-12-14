var controllers = require(".././controllers");
var AuthMiddleware = require("../middlewares/auth");

module.exports = (app, passport) => {


  app.get("/", controllers.HomeController.index);


  app.get("/tasks", AuthMiddleware.isLogged, controllers.HomeController.home);

  app.get("/signup", controllers.UserController.getSignUp);

  app.post("/signup", controllers.UserController.postSignUp);

  app.get("/login", controllers.UserController.getSignIn);

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/tasks",
      failureRedirect: "/login",
      failureFlash: true
    })
  );


};
