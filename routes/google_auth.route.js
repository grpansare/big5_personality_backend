const  express=require('express');
const { googleAuth, googleAuthCallback, loginSuccess } = require('../controllers/authController');


const router=express.Router()

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
router.get('/login/success', loginSuccess);

module.exports=router