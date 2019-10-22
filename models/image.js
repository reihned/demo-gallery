'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    url: DataTypes.STRING,
    urlGreyscale: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER
  }, {});
  image.associate = function(models) {
    // associations can be defined here
  };
  return image;
};