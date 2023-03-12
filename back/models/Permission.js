const { DataTypes } = require("sequelize");

const sequelize = require('../db')
 
const Permission = sequelize.define("permissions", {

   permission: {
      type: DataTypes.STRING,
      allowNull: true
   },



});

sequelize.sync().then(() => {
    console.log('Permissions table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Permission