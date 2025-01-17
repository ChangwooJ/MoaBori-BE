const axios = require('axios');
const User = require('../models/userModel');  // User 모델 가져오기

// 잔액조회 API 호출
const getBalance = async (req, res) => {
  const userId = req.user;  // 세션에서 userId 가져오기
  console.log("BID: ",userId);
  try {
    // DB에서 액세스 토큰을 가져옴
    const user = await User.findById(userId);
    console.log("BTK: ", user.accessToken);
    if (!user || !user.accessToken) {
      return res.status(404).json({ message: 'User or access token not found' });
    }

    // 액세스 토큰을 이용해 오픈뱅킹 API 호출
    const response = await axios.get('https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num', {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        // API에 필요한 파라미터들
        fintech_use_num: '123456789012345678901234',
        bank_tran_id: "F123456789U4BC34239Z",
        tran_dtime: "20160310101921"
      },
    });

    // 성공적인 응답 처리
    res.status(200).json(response.data);
  } catch (error) {
    console.error('API 호출 실패:', error);
    res.status(500).json({ message: 'Failed to get balance', error: error.message });
  }
};

module.exports = { getBalance };