const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cors=require("cors")
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();

const admin=require('./routes/adminroutes')
const user=require('./routes/userRoutes');

const mongoDB = process.env.DATABASE;



main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("conected")
}

app.use("/admin",admin)
app.use("/user",user)



app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

