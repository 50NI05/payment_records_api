import { pool } from '../../db.js'
import timezone from "moment-timezone";

export const addPayment = async (req, res) => {
  const { apartment, name, amount } = req.body

  // const date = new Date();
  // const current_date = ('0' + date.getDate()).slice(-2) + '/' +
  //   ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
  //   date.getFullYear() + ' ' +
  //   ('0' + date.getHours()).slice(-2) + ':' +
  //   ('0' + date.getMinutes()).slice(-2) + ':' +
  //   ('0' + date.getSeconds()).slice(-2);

  const current_date = timezone.tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
  // console.log(fecha_actual);

  try {
    const [rows] = await pool.query('INSERT INTO t_payment (apartment, name, amount, payment_date) VALUES (?, ?, ?, ?)', [apartment, name, amount, current_date])

    if (rows.affectedRows) {
      res.status(200).send({
        status: 'SUCCESS',
        data: 'El pago se ha registrado correctamente'
      })
    } else {
      res.json({
        status: 'Error',
        data: 'El pago no se pudo procesar. Por favor, intente más tarde'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}