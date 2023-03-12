const { DataTypes } = require("sequelize");

const sequelize = require('../db')
 
const Secteur = sequelize.define("secteurs", {

   ville: {
      type: DataTypes.STRING,
      allowNull: true
   },
   secteur: {
      type: DataTypes.STRING,
      allowNull: true
   },
   deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   }

});

sequelize.sync().then(() => {
    console.log('Secteurs table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Secteur