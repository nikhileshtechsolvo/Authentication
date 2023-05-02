const express = require('express');
const router = express.Router();
const cotroller=require("../controllers/admincontroller")


router.post("/roletable",cotroller.roleTable)
router.post("/department",cotroller.department)

module.exports=router