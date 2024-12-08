 // index.js
 const dotenv = require('dotenv');
 // Load environment variables right at the start
 dotenv.config();
 const express = require('express');
 const session = require('express-session');
 const cors = require('cors');
 const passport = require('./config/passportConfig.js');
 const authRoutes = require('./routes/google_auth.route.js');

 const userRoutes=require('./routes/user.route.js')
 require('./db/conn.js');
 
 const app = express();
 
 const PORT = process.env.PORT || 6006;
 console.log(PORT);
 
 
 
 
 // Middleware
 app.use(cors({
     origin: "http://localhost:5173",
     methods: "GET,POST,PUT,DELETE",
     credentials: true,
 }));
 app.use(express.json());
 
 app.use(session({
     secret:process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: true,
 }));
 
//  Initialize passport and session handling
 app.use(passport.initialize());
 app.use(passport.session());
 
 
 // Routes
 app.use('/auth', authRoutes);
 app.use('/user',userRoutes)
 
 // Start server
 app.listen(PORT, () => {
     console.log(`Server started on port ${PORT}`);
 });
 