const express = require('express');
const { signUpUser, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signUpUser);     // 회원가입
router.post('/login', loginUser);       // 로그인인
router.post('/logout', logoutUser);

module.exports = router;