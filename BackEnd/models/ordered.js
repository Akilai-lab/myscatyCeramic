const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Commande =  db.define('ordered', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    articles: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    idArticle: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    imgArticle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },
  {timestamps : false}
);
module.exports = Commande;