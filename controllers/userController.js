const userModel=require('../models/userSchema')
const bcrypt=require('bcryptjs')

const jwt=require('jsonwebtoken')
const crypto = require('crypto');
const nodemailer = require('nodemailer');



const signUp = async (req, res) => {
    try {
        console.log(req.body);

        // Destructure and parse inputs
        const { firstname, lastname, username, email, password, phoneno, age, designation } = req.body;

        // Parse numeric fields
        const parsedPhoneno = Number.parseInt(phoneno);
        const parsedAge = Number.parseInt(age);

        // Construct additional fields
        const fullname = `${firstname} ${lastname}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare user object
        const user = {
            fullname,
            username,
            email,
            password: hashedPassword,
            phoneno: parsedPhoneno,
            age: parsedAge,
            Designation:designation
        };

        // Save user to database
        const savedUser = new userModel(user);
        await savedUser.save();

        // Respond with success
        res.status(201).json({ message: "User registered successfully", user: savedUser, success: true });
    } catch (error) {
        console.error(error);

        // Respond with error
        res.status(500).json({ message: "Error registering user", error });
    }
};
const generateOTP = (length = 6) => {
    let otp = '';
    const characters = '0123456789'; // You can include letters if needed
    for (let i = 0; i < length; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  };
  
const sendEmail = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
      if (!user) return res.status(404).send('User not found.');
  
      const token = crypto.randomBytes(32).toString('hex');
      user.resetToken = token;
      let otp=generateOTP()
      user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'big5personalitytest151@gmail.com',
          pass: 'cydh wxud gsdn bgta',
        },
      });
  
      await transporter.sendMail({
        from: 'big5personalitytest151@gmail.com',
        to: user.email,
        subject: 'Your OTP Code',
        html: `
          <p>You requested an OTP for password reset. Your OTP is <strong>${otp}</strong>.</p>
          <p>The OTP is valid for 10 minutes.</p>
        `,
      });
  
      res.json({msg:'Otp Has been sent to your email',otp});
    } catch (err) {
        console.log(err);
        
      res.status(500).send('Server error.');
    }
  };
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Input Validation
        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password are required", success: false });
        }

        // Find user by username
        const validUser = await userModel.findOne({ username });
        if (!validUser) {
            return res.status(401).json({ message: "Invalid username or password", success: false });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compareSync(password, validUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password", success: false });
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET,{ expiresIn: '1h' })
        const {password:hashedPass,...rest}=validUser._doc
        const expiryDate=new Date(Date.now()+3600000)//1hour
        console.log(token)

        // Respond with success
    
        res.cookie('accessToken',token,{httpOnly:true,expires:expiryDate,domain: 'localhost'}).status(200).json({success:true,rest});
    } catch (error) {
        console.error(error);

        // Respond with error
        res.status(500).json({ message: "Error logging in", error, success: false });
    }
};
const logout=(req, res) => {
  res.clearCookie('accessToken'); 
  res.json({ message: 'Logged out successfully.' });
};
const uploadProfile=async(req, res) => {
  try {
    const updateUser=await userModel.findByIdAndUpdate(req.params.id,{
      $set:{profilePicture:`uploads/${req.file.filename}`}
    },{new:true})
    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: `uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
};
const updateUser=async(req,res)=>{
    try{
        if(req.body.password){
            req.body.password=bcrypt.hashSync(req.body.password,10);
    
        }
        const updateUser=await userModel.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                phoneno:req.body.phoneno,
                age:req.body.age,
                Designation:req.body.Designation,
                fullname:req.body.fullname

               
            }
        },{new:true})
        const {password,...rest}=updateUser._doc;
        return res.status(200).json(updateUser)
       }
       catch(err){
        console.log(err);
        
          return res.status(400).json({"msg":"error updating user"})
    }

    
}


const changepass=async (req, res) => {
  const { password ,userEmail} = req.body;


  if (!password) {
    return res.status(400).json({ msg: 'Password is required.' });
  }

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.updateOne({ email: userEmail }, { password: hashedPassword });

    res.status(200).json({ msg: 'Password updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to update password. Please try again.' });
  }
};

module.exports={signUp,signIn,updateUser,sendEmail,changepass,logout,uploadProfile}

