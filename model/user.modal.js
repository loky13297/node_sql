// Sequelize model 'user.js'
const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Adjust path to your sequelize instance

const users = sequelize.define('users', {
  userId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobileNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  // Other model options
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = users;
