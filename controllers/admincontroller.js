const Role = require('../models/admin/role');
const Department=require('../models/admin/department')
const dotenv = require('dotenv');
dotenv.config();

let depCode=Number(process.env.DEPARTMENT_CODE)
let roleCode=Number(process.env.ROLE_CODE)



exports.roleTable=( async(req,res)=>{
   const {role,department}=req.body
 const newRole=new Role({
    role:role,
    department:department,
    rolecode:"R"+roleCode
})
//check departments




newRole.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    } else {
      
roleCode++;
      res.status(200).send({
        message: "Role Inserted to database!!",
      });
    }
  });

})



exports.department=( async(req,res)=>{
  const {department}=req.body


const check=await Department.findOne({department:department})
if(check){
  res.status(401).send({
    message: "department is present  in database.....!!",
    
  });
  return
}

const newDepartment=new Department({
  department:department,
  departmentcode:"D"+depCode++
})


newDepartment.save((err, user) => {
   if (err) {
     res.status(500).send({
       message: err,
     });
     return;
   } else {
     
     res.status(200).send({
       message: "department Inserted to database!!",
     });
   }
 });

})