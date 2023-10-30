'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      produtos.belongsTo(models.usuarios, {
        foreignKey: "usuario_id"
      })
    }
  }
  produtos.init({
    nome: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'produtos',
  });
  return produtos;
};