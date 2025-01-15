const express = require('express');
const { authUser, authToken } = require('../controllers/authController');
const router = express.Router();

router.get('/auth', authUser);
router.get('/openbank', authToken);

module.exports = router;