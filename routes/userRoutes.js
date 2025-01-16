const express = require('express');
const { loginUser, logoutUser, singUpUser } = require('../controllers/userController');
const { authUser, authCallback } = require('../controllers/tokenController');
const router = express.Router();

router.post('/signup', singUpUser);     // 회원가입
router.post('/login', loginUser);       // 로그인
router.post('/logout', logoutUser);     // 로그아웃
router.post('/auth', authUser);         // 본인인증(code 제공)
router.get('/auth/callback', authCallback); // code -> acessToken

module.exports = router;