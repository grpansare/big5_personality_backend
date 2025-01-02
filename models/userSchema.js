const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
    username: String,
    fullname:{
      type:String,
      required:true
    },
    phoneno:Number,
    age:Number,
    Designation:{
      type:String,
      
    },
    email: String,
    password: String,
    profilePicture:String

  }, { timestamps: true });
  


 const userModel=new mongoose.model("users",userSchema)

 module.exports=userModel
