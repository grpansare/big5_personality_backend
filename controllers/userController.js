const userModel=require('../models/userSchema')
const bcrypt=require('bcryptjs')

 const signUp = async (req, res) => {
    
    try {
        console.log(req.body);
        const {firstname,lastname,username,email,password}=req.body

        const fullname=firstname+" "+lastname
        const hashedpassword=await bcrypt.hash(password,10)

        
        
        const user = {fullname,username,email,password:hashedpassword}
        const savedUser = new userModel(user);
        await savedUser.save();
        res.status(201).json({ message: "User registered successfully", user: savedUser,success:true });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};



 const signIn = async (req, res) => {
 
    try{
    
        const {username,password}=req.body;
       const user=await userModel.findOne({username})
       if(!user){
      return  res.status(401).json({error:"Invalid username or password",success:false})
       }
       if(user.password !== password){
       return  res.status(401).json({error:"Invalid isername or password",success:false})
       }
       res.status(200).json({msg:"login successful",success:true,user:user});
    }catch(err){
        res.status(500).json({msg:"invlaid user",success:false})
    }
};
module.exports={signUp,signIn}

