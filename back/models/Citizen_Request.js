const { DataTypes } = require("sequelize");

const sequelize = require('../db');
const Bin = require("./Bin");
 
const Citizen_Request = sequelize.define("citizens_requests", {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});
Bin.hasMany(Citizen_Request)
Citizen_Request.belongsTo(Bin)

sequelize.sync().then(() => {
    console.log('Citizens_Requests table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Citizen_Request