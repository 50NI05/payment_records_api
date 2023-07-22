import Sequelize from "sequelize";
import { UserModel } from "../src/models/User.js";
import { PaymentModel } from "../src/models/Payment.js"
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config.js'
const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);
export const User = UserModel(sequelize);
export const Payment = PaymentModel(sequelize)