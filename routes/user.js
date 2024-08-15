const express = require('express');
const router = express.Router();
const UserModule = require('../modules/user');

// 定義註冊和登錄路由
router.post('/register', UserModule.Register);
router.post('/login', UserModule.Login);

module.exports = router;