const { DataTypes } = require("sequelize");

const sequelize = require('../db')
 
const Role = sequelize.define("roles", {

   role: {
      type: DataTypes.STRING,
      allowNull: true
   },

});

sequelize.sync().then(() => {
    console.log('Roles table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Role