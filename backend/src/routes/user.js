const UserController = require("../controllers/user");

module.exports = (app) => {
  // auth
  app.post("/api/user/signup", UserController.signup);
  app.post("/api/user/signin", UserController.signin);
};
