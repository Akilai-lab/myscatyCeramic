const express = require('express');
const router = express.Router();

const Confirmation = require('../controllers/confirmation');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config')

router.get('/getAllsOrders', multer,Confirmation.getAllOrders);
router.delete('/deleteAnOrder', auth, Confirmation.deleteAnOrder);
module.exports = router;
