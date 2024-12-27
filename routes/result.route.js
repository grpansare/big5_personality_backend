const express = require('express');  // Use require to import express

const { verifyToken } = require('../utils/verifyToken');
const { saveresult, getResults } = require('../controllers/ResultController');
const router = express.Router();     // Set up the router

// Define your routes here

  // Export the router for use in other files


  
router.post('/save-result',saveresult)
router.get('/get-results/:username',getResults)
 
module.exports=router