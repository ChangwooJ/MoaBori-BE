const express = require('express');
const { signUpUser } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signUpUser);     // 회원가입

module.exports = router;