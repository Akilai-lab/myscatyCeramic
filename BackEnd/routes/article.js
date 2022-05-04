const express = require('express');
const router = express.Router();

const article = require('../controllers/article');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config')

router.get('/allProject', multer, article.showAllProject);
router.get('/OneArticle',multer, article.descriptOfArticle);
router.post('/articlenewProject', auth, multer, article.addProject);
router.post('/commande', auth, article.addCommande); 
module.exports = router;