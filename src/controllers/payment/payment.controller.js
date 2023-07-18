import { Payment } from '../../db.js'
import timezone from "moment-timezone";

export const addPayment = async (req, res) => {
  const data = req.body;
  const current_date = timezone.tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
  // console.log(current_date);

  try {
    const payment = await Payment.findOne({
      where: { reference_number: data.reference_number }
    })

    if (payment === null) {
      const paymentCreate = await Payment.create({
        name: data.name,
        identity_card: data.identity_card,
        phone_number: data.phone_number,
        apartment: data.apartment,
        reference_number: data.reference_number,
        amount: data.amount,
        payment_date: current_date,
      })
      
      if (paymentCreate) {
        res.status(200).send({
          status: 'SUCCESS',
          data: 'El pago se ha registrado correctamente'
        })
      } else {
        res.json({
          status: 'ERROR',
          data: 'El pago no se pudo registrar. Por favor, intente más tarde'
        })
      }
    } else {
      res.json({
        status: 'ERROR',
        data: 'El pago ya ha sido registrado'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}

export const getPayment = async (req, res) => {
  try {
    const payments = await Payment.findAll()
    
    if (payments) {
      res.json({
        status: 'SUCCESS',
        data: payments
      })
    } else {
      res.json({
        status: 'SUCCESS',
        data: 'Lo sentimos, pero no podemos encontrar los registros de pago'
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}

export const updatePayment = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const payment = await Payment.findOne({ where: { id: id } })

    if (payment) {
      const paymentUpdate = await  Payment.update({
        name: data.name,
        identity_card: data.identity_card,
        phone_number: data.phone_number,
        apartment: data.apartment,
        reference_number: data.reference_number,
        amount: data.amount,
        payment_date: data.payment_date
      }, { where: { id: id } })

      if (paymentUpdate) {
        res.json({
          status: 'SUCCESS',
          data: 'Registro actualizado correctamente'
        })
      } else {
        res.json({
          status: 'ERROR',
          data: 'Lo siento, no se pudo actualizar el registro. Por favor, inténtalo de nuevo más tarde.'
        })
      }
    } else {
      res.status(200).json({
        status: 'ERROR',
        data: 'Registro no encontrado'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}

export const deletePayment = async (req, res) => {
  const id = req.params.id;

  try {
    const payment = await Payment.findOne({ where: { id: id } })

    if (payment) {
      response.destroy().then(
        res.status(200).json({
          status: 'SUCCESS'
        })
      )
    } else {
      res.status(200).json({
        status: 'ERROR',
        data: 'Registro no encontrado'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}