const User = require('../models/userModel');

const singUpUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ message: '입력되지 않은 정보가 있습니다.' });
    }

    try {
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: '회원가입 성공' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { singUpUser };