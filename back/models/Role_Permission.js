const { DataTypes } = require("sequelize");

const sequelize = require('../db')
const Role = require("./Role");
const Permission = require("./Permission");
 
const Role_Permission = sequelize.define("roles_permissions", {
    afficher: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    modifier: {
       type: DataTypes.BOOLEAN,
       allowNull: true
    },
    supprimer: {
       type: DataTypes.BOOLEAN,
       allowNull: true
    },
    ajouter: {
       type: DataTypes.BOOLEAN,
       allowNull: true
    },
} , {timestamps: false});

Role.belongsToMany(Permission, { through: Role_Permission });
Permission.belongsToMany(Role, { through: Role_Permission });

sequelize.sync().then(() => {
    console.log('Roles_Permissions table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Role_Permission