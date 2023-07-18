import Sequelize from "sequelize";
import { UserModel } from "../src/models/User.js";
import { PaymentModel } from "../src/models/Payment.js"
const sequelize = new Sequelize('mysql://root:DB_PASSWORD@localhost:DB_PORT/DB_NAME')
export const User = UserModel(sequelize);
export const Payment = PaymentModel(sequelize)