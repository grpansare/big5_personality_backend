const express = require('express');  // Use require to import express
const { signUp,signIn ,updateUser, sendEmail, changepass} = require('../controllers/userController');
const { verifyToken } = require('../utils/verifyToken');
const router = express.Router();     // Set up the router

// Define your routes here

  // Export the router for use in other files


  
router.post('/signup',signUp)
router.post('/signin',signIn)
router.put('/update/:id',verifyToken,updateUser)
router.post('/sendemail',sendEmail)
router.post('/changepassword',changepass)
 
module.exports=router