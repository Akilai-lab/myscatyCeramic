const express = require('express');
const router = express.Router();

const Commande = require('../controllers/ordered');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config')

router.post('/CheckOrder', auth, Commande.CheckOrder);
router.get('/getOrder', auth, multer,Commande.getActualOrder);
router.get('/getAllOrder', multer,Commande.getAllOrder);
router.delete('/deleteOrder', auth, Commande.deleteCommande);
module.exports = router;