require("dotenv").config();
const axios = require('axios'); 

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
  console.log('code: ',code);
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
      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);
      
      res.status(200).json({ accessToken });
      // 이 부분에 저장 로직 추가가
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get accessToken', error: error.message });
    }
  };

module.exports = { authUser, authCallback };
