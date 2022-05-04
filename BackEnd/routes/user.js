const express = require('express');
const router = express.Router();

const users = require('../controllers/user');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config')
router.post('/signin', users.signin);
router.post('/login' ,users.login);
module.exports = router;