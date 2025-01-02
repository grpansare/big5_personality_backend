const express = require('express');  // Use require to import express
const { signUp,signIn ,updateUser, sendEmail, changepass, logout, uploadProfile} = require('../controllers/userController');
const { verifyToken } = require('../utils/verifyToken');
const upload = require('../utils/multer');
const router = express.Router();     // Set up the router

// Define your routes here

  // Export the router for use in other files


  
router.post('/signup',signUp)
router.post('/signin',signIn)
router.put('/update/:id',verifyToken,updateUser)
router.post('/sendemail',sendEmail)
router.post('/changepassword',changepass)
router.put('/upload/:id', upload.single('file'), uploadProfile)
router.post('/logout',logout)
 
module.exports=router