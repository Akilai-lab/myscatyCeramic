const express = require('express');

const app = express();
const { Sequelize , DataTypes } = require('sequelize');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const user = require('./routes/user');
const article = require ('./routes/article');
const confirmation = require('./routes/confirmation');
const ordered = require('./routes/ordered')
app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});  

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json());

var http = require('http');
var url = require('url');
/**créer un bloc et router vers /localhost:3030/ pour envoyer les données envoyées par l'utilisateur 
 * et qu'une fois envoyées au localhost, que ca soit récupéré dans les cookies*/
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', user);
app.use('/api/article', article);
app.use('/api/order',ordered);
app.use('/api/confirmation', confirmation);
module.exports = app;