require("dotenv").config();
const axios = require('axios');
const User = require("../models/userModel");

// 본인인증 요청 시 OAuth2를 이용한 오픈뱅킹 인증 페이지로 리디렉션
const authUser = async (req, res) => {
  try {
    const redirectUrl = `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${process.env.SCOPE}&state=ajwkld12ajwkld12ajwkld12ajwkld12`;

    res.status(200).json({ redirectUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to auth', error: error.message });
  }
};

const authCallback = async (req, res) => {
  const { code, state } = req.query;  // 리디렉션 URL에서 code와 state 값을 가져옴
  const userId = req.user;

  try {
    // 인증 코드로 액세스 토큰을 요청
    const response = await axios.post(
      'https://testapi.openbanking.or.kr/oauth/2.0/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // 액세스 토큰을 얻은 후, 이를 응답으로 반환
    const { access_token, refresh_token } = response.data;
    
    // 세션에 저장된 user ID를 사용하여 DB에서 사용자 찾기
    const user = await User.findById(userId);  // userId는 passport 세션에서 가져온 값

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // DB에 액세스 토큰과 리프레시 토큰 저장
    user.accessToken = access_token;
    user.refreshToken = refresh_token;

    await user.save();  // 사용자 데이터 저장

    // 성공적으로 토큰을 저장한 후, 사용자를 원래 페이지로 리디렉션
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get accessToken', error: error.message });
  }
};

module.exports = { authUser, authCallback };
