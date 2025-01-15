const express = require('express');
const { loginUser, logoutUser, singUpUser } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', singUpUser);     // 회원가입
router.post('/login', loginUser);       // 로그인인
router.post('/logout', logoutUser);

module.exports = router;