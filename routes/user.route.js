const express = require('express');  // Use require to import express
const { signUp,signIn } = require('../controllers/userController');
const router = express.Router();     // Set up the router

// Define your routes here

  // Export the router for use in other files


  
router.post('/signup',signUp)
router.post('/signin',signIn)
 
module.exports=router