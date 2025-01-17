const passport = require('passport');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const singUpUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ message: '입력되지 않은 정보가 있습니다.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: '회원가입 성공' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: error.message });
    }
}

const loginUser = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log(user);
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json({ message: info.message || "인증 실패" });
        }
        req.logIn(user, (err) => {
            if(err){
                console.error("Login Error:", err);
                return next(err);
            }
            console.log("Session Data after login:", req.session);
            return res.status(200).json({ message: "로그인 성공", user });
        });
    })(req, res, next);
}

const logoutUser = (req, res) => {
    req.logout((err) => {
        if(err){
            return res.status(500).json({ message: 'Logout error' });
        }
        res.redirect('/login');
    })
}

module.exports = { singUpUser, loginUser, logoutUser };