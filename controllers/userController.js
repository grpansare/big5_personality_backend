const userModel=require('../models/userSchema')
const bcrypt=require('bcryptjs')

const jwt=require('jsonwebtoken')


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
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
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
module.exports={signUp,signIn}

