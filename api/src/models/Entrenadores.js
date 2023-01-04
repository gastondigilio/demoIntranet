const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "entrenadores",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
