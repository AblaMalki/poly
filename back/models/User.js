const { DataTypes } = require("sequelize");

const sequelize = require('../db')
const Secteur = require("./Secteur");
 
const User = sequelize.define("users", {
   nom: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
   },
   prenom: {
      type: DataTypes.STRING,
      allowNull: true
   },
   email: {
      type: DataTypes.STRING,
      allowNull: true
   },
   role: {
      type: DataTypes.STRING,
      allowNull: true
   },
   numeroTel: {
      type: DataTypes.STRING,
      allowNull: true
   },
   password: {
      type: DataTypes.STRING,
      allowNull: true
   },
   deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   }


});

Secteur.hasMany(User)
User.belongsTo(Secteur)

sequelize.sync().then(() => {
    console.log('Users table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = User