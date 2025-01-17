const express = require('express');
const session = require("express-session");
const cors = require('cors');
const passport = require("passport");
require('./config/passport');
const userRoutes = require('./routes/userRoutes');
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',  // 클라이언트 주소
  credentials: true,  // 쿠키와 세션을 포함시키기 위한 설정
};

//Middleware
app.use(cors(corsOptions));
app.use(express.json());

//session

app.use(session({
  secret: process.env.SESSION_SECRET, // 임의의 비밀 키
  resave: false,  // 세션을 계속 저장할지 여부
  saveUninitialized: false,  // 초기화되지 않은 세션을 저장할지 여부
  cookie: { secure: false }  // 개발 환경에서 httpOnly와 secure 속성을 false로 설정
}));

//Passport 초기화 및 세션 연결
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/users', userRoutes);

app.get('/profile', (req, res) => {
  console.log("Session in /profile route:", req.session);
  if (req.user) {
      res.json({ message: 'User profile', user: req.user });
  } else {
      res.status(401).json({ message: 'Unauthorized' });
  }
});

//MongoDB 연결
const connectDB = require('./config/db');
connectDB();

//Server 연결
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));