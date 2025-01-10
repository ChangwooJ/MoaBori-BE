require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/users', userRoutes);

//MongoDB 연결
const connectDB = require('./config/db');
connectDB();

//Server 연결
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));