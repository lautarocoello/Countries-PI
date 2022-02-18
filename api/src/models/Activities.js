const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/* creacion de tabla para actividades turisticas con sus respectivos datos
nos pedia que tenga un nombre, una dificultad de 1 a 5, una duracion estimada
y en que temporada se podia realizar dicha actividad aceptando unicamente
como entrada de valores 'Verano', 'Otoño', 'Invierno', 'Primavera'
*/

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activities",
    {
      //id autom sequelize
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      difficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAt: false,
    }
  );
};
