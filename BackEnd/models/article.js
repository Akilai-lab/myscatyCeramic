const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Article =  db.define('article', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    price :{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    firstObject: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    scndObject: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    thirdObject: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    img: {
        type: DataTypes.JSON,
        allowNull: true
    }
  },
  {timestamps : false}
);
module.exports = Article;