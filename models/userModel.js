const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 사용자 정보 모델
const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: false,
    },
  }, {
    timestamps: true,
  });
  
  const User = mongoose.model('User', userSchema);

module.exports = User;