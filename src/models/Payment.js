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
        allowNull: true,
      },
      identity_card: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      apartment: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reference_number: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
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