require('dotenv').config();
const express = require('express');
const session = require("express-session");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//session
app.use(
    session({
      secret: "yourSecretKey",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, //HTTPS 환경에서는 true로 설정
    })
);

//Passport 초기화 및 세션 연결
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/users', userRoutes);

//MongoDB 연결
const connectDB = require('./config/db');
connectDB();

//Server 연결
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));