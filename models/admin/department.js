const mongoose = require("mongoose");
mongoose.set("strictQuery", true);





const departMentSchema = new mongoose.Schema({
  department: {
    type: String,
    required: [true, "Please fill department"],
  },
  departmentcode: String,
});

const Department = new mongoose.model("department", departMentSchema);

module.exports = Department;
