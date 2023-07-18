import Sequelize from "sequelize";
import { UserModel } from "../src/models/User.js";
import { PaymentModel } from "../src/models/Payment.js"
const sequelize = new Sequelize('mysql://root:123456@localhost:3306/registerPaymentDB')
export const User = UserModel(sequelize);
export const Payment = PaymentModel(sequelize)