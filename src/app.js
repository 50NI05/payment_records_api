// const express = require('express')
import express from 'express';
import session from 'express-session';
import cors from "cors";
import loginRoutes from './routes/auth/auth.routes.js';
import usersRoutes from './routes/user/user.routes.js';
import paymentRoutes from "./routes/payment/payment.routes.js";
import aiRoutes from "./routes/ai/ai.routes.js";

const app = express()

app.use(express.json())

app.use(cors())

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

app.use('/api', loginRoutes)
app.use('/api', usersRoutes)
app.use('/api', paymentRoutes)
app.use('/api', aiRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    status: 'Error',
    data: 'Endpoint not found'
  })
})

export default app