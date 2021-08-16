'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.User, {foreignKey: 'ownerId'})
      Question.hasMany(models.Answer, { foreignKey: 'questionId' });
    }
  };
  Question.init({
    ownerId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};