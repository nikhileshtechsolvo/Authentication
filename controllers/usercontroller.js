const register = require("../models/usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require('dotenv');
dotenv.config();

exports.registerUser = async (req, res) => {
  const { name, email, role, password, phonenumber,department } = req.body;

  const hash = await bcrypt
    .hash(password,Number(process.env.SALT_ROUNDS))
    .then((hashedPassword) => {
      return hashedPassword;
    });
//role and department are checked at front end
  const newUser = new register({
    name: name,
    email: email,
    phonenumber: phonenumber,
    password: hash,
    role: role,
    department:department
  });

  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    } else {
      // user.password=hash
      res.status(200).send({
        message: "User Inserted to database!!",
      });
    }
  });
};

exports.loginUser = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res
      .send({ message: "emty mail or pass required" })
      .redirect("/user/login");
  }
  const user = await register.findOne({ email: email });
  if (!user) {
    res.send({ message: "no user rejistered with this email" });
    return;
  }

  let flag = await bcrypt.compare(password, user.password).then((res) => {
    return res;
  });

  //   console.log(flag)
  if (!flag) {
    return res.send({ message: "invalid password" });
  }

  //create token

  const createToken = (id) => {
    return jwt.sign(
      {
        id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
  };
  const token = createToken(user.id);

  user.password = undefined;
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });

  // res.send("login")
};

exports.bankInfo = (req, res) => {
  
  const { accountHolderName, accountNumber, ifscCode, bankName } = req.body;
  const user_id=req.user.id

  const bankInfo = {
    accountHolderName: accountHolderName,
    accountNumber: accountNumber,
    ifscCode: ifscCode,
    bankName: bankName,
  }

  register.findByIdAndUpdate(
    user_id ,
    { $set: { bankInfo: bankInfo } },
    function (err, docs) {
      if (err) {
        console.log(err);
        return
      }
      res.json(bankInfo);
    }
  );

};

exports.personalInfo = (req, res) => {
  const { gender, nationality, address, martialStatus,phonenumber} = req.body;
  const user_id=req.user.id
  const personalInfo = {
    gender:gender, nationality:nationality, address:address,
     martialStatus:martialStatus,phonenumber:phonenumber

  };
  // console.log(personalInfo);

  register.findByIdAndUpdate(user_id, { $set: { personalInfo:personalInfo } },
    function (err, docs) {
      if (err) {
        console.log(err);
        return
      }
      res.json(personalInfo);

    }
  );

};



exports.getInfo=async(req,res)=>{

  const userid=req.user.id
  const search=req.query.search
  
  
  // console.log(search);
  let info=await register.findById(userid)
  
  if(!info){
    res.send({message:"user not pressent"})
  }res.send(info);
  // console.log(info);
  
  console.log(info[search]);
  
}
