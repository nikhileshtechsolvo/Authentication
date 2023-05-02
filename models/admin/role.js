const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const Department=require('./department')




const roleSchema = new mongoose.Schema({
    role:{
      type: String,
    required: [true, "Please fill role"],
    validate: validateRole
    },
    department:{
      type:String,
      required:[true, "Please provide department"],
      validate:validateDepartment
    },
    rolecode:String
  });

  async function validateRole(role) {
    const user = await Role.findOne({ role })
    if (user) throw new Error("This role is already registered .")
  }



  async function validateDepartment(department) {
    const check = await Department.findOne({ department })
    if (!check) throw new Error("plzzz provide valid department... .")
    // req.user=check
  }
  const Role = new mongoose.model("role", roleSchema);

module.exports=Role 