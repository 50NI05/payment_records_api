import { Payment } from '../../db.js'
import timezone from "moment-timezone";

export const addPayment = async (req, res) => {
  // const { name, identity_card, phone_number, apartment, reference_number, amount } = req.body
  const data = req.body;

  const current_date = timezone.tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
  // console.log(current_date);

  try {
    Payment.findOne({
      where: { reference_number: data.reference_number }
    }).then(response => {
      if (response === null) {
        Payment.create({
          name: data.name,
          identity_card: data.identity_card,
          phone_number: data.phone_number,
          apartment: data.apartment,
          reference_number: data.reference_number,
          amount: data.amount,
          payment_date: current_date,
        }).then(response => {
          if (response) {
            res.status(200).send({
              status: 'SUCCESS',
              data: 'El pago se ha registrado correctamente'
            })
          } else {
            res.json({
              status: 'Error',
              data: 'El pago no se pudo registrar. Por favor, intente más tarde'
            })
          }
        })
      } else {
        res.json({
          status: 'Error',
          data: 'El pago ya ha sido registrado'
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}

export const getPayment = async (req, res) => {
  try {
    Payment.findAll().then(response => {
      res.json({
        status: 'SUCCESS',
        data: response
      })
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}

export const deletePayment = (req, res) => {
  const id = req.params.id;
  try {
    Payment.findOne({
      where: { id: id }
    }).then(response => {
      if (response) {
        response.destroy().then(
          res.status(200).json({
            status: 'SUCCESS'
          })
        )
      } else {
        return res.status(200).json({
          status: 'Error',
          // data: 'User not found'
          data: 'Registro no encontrado'
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}