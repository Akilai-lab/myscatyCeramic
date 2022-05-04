const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Confirmation =  db.define('confirmation', {
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
    adminInfoSup : {
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
module.exports = Confirmation;