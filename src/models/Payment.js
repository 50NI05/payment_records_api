import DataTypes from "sequelize";

export const PaymentModel = (sequelize) => {
  return sequelize.define('t_payment',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identity_card: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      apartment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reference_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};