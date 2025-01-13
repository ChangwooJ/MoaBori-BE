const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

passport.use(
    new LocalStrategy(
      { usernameField: "email" }, // 클라이언트에서 보낸 "email" 필드를 사용자명으로 사용
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
  
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Invalid credentials" });
          }
  
          return done(null, user); // 인증 성공
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  // 사용자 정보를 세션에 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // 세션에서 사용자 정보를 복원
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  module.exports = passport;