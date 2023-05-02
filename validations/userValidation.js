const { body, validationResult } = require("express-validator");

const checks = [
  body("password", "emoty password value ").not().isEmpty(),
  body("password", "password length should be greater than 8").isLength({
    min: 8,
  }),
  body("name", "name required").not().isEmpty(),
  body("role", "role required").not().isEmpty(),
  body("email", "proper email required ").isEmail(),
  body("phonenumber", "not empty").not().isEmpty()
];

exports.logInValidations = [
  body("password", "emoty password value ").not().isEmpty(),
  body("password", "password length should be greater than 8").isLength({
    min: 8,
  }),
  body("email", "empty mail").not().isEmpty(),
  body("email", "proper email required ").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.bankValidation=[
  body("accountHolderName", "enter name value ").not().isEmpty(),
  body("accountNumber", "not proper number").not().isEmpty(),
  body("ifscCode", "proper ifsc required ").not().isEmpty(),
  body("bankName", "proper bankname is  required ").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

