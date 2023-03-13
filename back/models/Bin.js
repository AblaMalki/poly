const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const Secteur = require('./Secteur');
const Type_pdc = require('./TypePdc');

const Bin = sequelize.define('bins', {
  srb: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  nom_pdc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  date_deploiement: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  etat: {
    type: DataTypes.ENUM('Actif', 'Pending'),
    defaultValue: 'Pending',
    allowNull: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Type_pdc.hasMany(Bin);
Bin.belongsTo(Type_pdc);
Secteur.hasMany(Bin);
Bin.belongsTo(Secteur);

sequelize
  .sync()
  .then(() => {
    console.log('Bins table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = Bin;
