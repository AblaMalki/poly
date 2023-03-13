const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const TypePdc = sequelize.define('type_pdc', {
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('Types pdc table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = TypePdc;
