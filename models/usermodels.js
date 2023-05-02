const mongoose = require("mongoose");
const validator = require("validator");
mongoose.set("strictQuery", true);

/*
const personalInfo=new mongoose.Schema({
  gender:String,
  nationality:String,
  Religion:String,
  Married:Boolean,
})

const educExpe=new mongoose.Schema({
  collegename:String,
  degree:String,
  course:String,
  experienc:Number,//in years/months
  skills:Array
})
*/


const bankInfo=new mongoose.Schema({
  accountNumber: {
    type: String,
    required: [true,"number required"]
  },
  accountHolderName: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  ifscCode: {
    type: String,
    required: true
  }

})


const registerSchema = new mongoose.Schema({
  name: {
    
    type: String,
    required: [
      true,
      "fullname not provided. Cannot create user without fullname ",
    ],
  },
  email: { type:String,
    required:true,
    validate: validateEmail,
  },
  password: {
    //min length validations left
    type: String,
    // min:8,
    required: [true,"password must be required"]
    //other validations are done at front end 
    
  },
  phonenumber: {
    type: Number,
    required:true,

  },

  role: {
    type: String,
  
    required:[true,"role is required"]
  },
  department:{
    type:String,
    required:[true,"department is required"]
  },
  //nested schema lena pr object id bhi create ho rahi hai 
  bankInfo:Object,
  personalInfo:Object,
  eduexperience:Object

});
const Register = new mongoose.model("register", registerSchema);



//email validations
async function validateEmail(email) {
  if (!validator.isEmail(email)) throw new Error("Please enter a valid email address.")
  const user = await Register.findOne({ email })
  if (user) throw new Error("A user is already registered with this email address.")
}

module.exports = Register;
// exports.Register;
// exports.bankInfo
