 // index.js
 const dotenv = require('dotenv');
 // Load environment variables right at the start
 dotenv.config();
 const express = require('express');
 const session = require('express-session');
 const cors = require('cors');
 const passport = require('./config/passportConfig.js');
 const authRoutes = require('./routes/google_auth.route.js');
 const resultroutes = require('./routes/result.route.js');
 const cookieParser = require("cookie-parser");
 const multer = require('multer');
 const path = require('path');


 const userRoutes=require('./routes/user.route.js')
 require('./db/conn.js');
 
 const app = express();


 const PORT = process.env.PORT || 6006;
 console.log(PORT);
 
 
 
 
 // Middleware
 app.use(cors({
     origin: "https://big-5-personality-test.netlify.app",
     methods: "GET,POST,PUT,DELETE",
     credentials: true,
 }));
 app.use(express.json());


app.use(cookieParser());

 app.use(session({
     secret:process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: true,
 }));


 
//  Initialize passport and session handling
 app.use(passport.initialize());
 app.use(passport.session());
 
 
 // Routes


  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 app.use('/auth', authRoutes);
 app.use('/user',userRoutes)
 app.use('/result',resultroutes)
 
 // Start server
 app.listen(PORT, () => {
     console.log(`Server started on port ${PORT}`);
 });
 