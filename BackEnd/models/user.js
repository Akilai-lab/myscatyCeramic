const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const User =  db.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {timestamps : false}
);
module.exports = User;