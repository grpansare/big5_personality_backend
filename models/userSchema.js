const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
    username: String,
    fullname:{
      type:String,
      required:true
    },
    
    email: String,
    password: String
  }, { timestamps: true });
  


 const userModel=new mongoose.model("users1",userSchema)

 module.exports=userModel
