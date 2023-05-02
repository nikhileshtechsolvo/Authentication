const express = require("express");
const router = express.Router();

const user = require("../validations/userValidation");
const controller = require("../controllers/usercontroller");
const roleCont=require("../controllers/roles")
const auth = require("../Auth/auth");

router.post("/register", controller.registerUser);
router.get("/login", user.logInValidations, controller.loginUser);

router
  .route("/info/bank")
  .post(auth.tokenAuth, user.bankValidation, controller.bankInfo)
  .put(auth.tokenAuth, user.bankValidation, controller.bankInfo);

router
  .route("/info/personal")
  .post(auth.tokenAuth, controller.personalInfo)
  .put(auth.tokenAuth, controller.personalInfo);

  router.route("/role")
  .post(roleCont.roleAdd)

router.get("/info", auth.tokenAuth, controller.getInfo); //query or send all info later

module.exports = router;
