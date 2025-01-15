require('dotenv').config();
const crypto = require('crypto');
const state = crypto.randomBytes(16).toString('hex');
const axios = require('axios');

const authUser = (req, res) => {
    const authUrl = `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=${process.env.client_id}&redirect_uri=${process.env.redirect_uri}&scope=${process.env.scope}&state=${state}`;
    res.redirect(authUrl);
};

const authToken = async (req, res) => {
    const authorizationCode = req.query.code;
    const state = req.query.state;

    if(!authorizationCode) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
        const tokenResponse = await axios.post('https://testapi.openbanking.or.kr/oauth/2.0/token', {
            code: authorizationCode,
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            redirect_uri: process.env.redirect_uri,
            grant_type: 'authorization_code'
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;
        console.log("2: ", accessToken);
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { authUser, authToken };