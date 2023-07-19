// import { pool } from '../../db.js'
import bcryptjs from "bcryptjs";
import { User } from "../../db.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()

    if (users) {
      res.json({
        status: 'SUCCESS',
        data: users
      })
    } else {
      res.json({
        status: 'ERROR',
        data: 'Lo sentimos, pero no podemos encontrar los usuarios'
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}

export const getUser = async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOne({ where: { id: id } });

    if (user === null) {
      return res.status(404).json({
        status: 'ERROR',
        data: 'Lo sentimos, pero no podemos encontrar el usuario'
      })
    } else {
      res.json({
        status: 'SUCCESS',
        data: user
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}

export const createUser = async (req, res) => {
  let data = req.body;

  try {
    const user = await User.findOne({ where: { username: data.username } })

    if (user === null) {
      const salt = await bcryptjs.genSalt()
      const hash = await bcryptjs.hash(data.password, salt)

      const useCreate = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: hash,
      })

      if (useCreate) {
        res.json({
          status: 'SUCCESS',
          data: 'Usuario registrado exitosamente',
        });
      } else {
        res.json({
          status: 'ERROR',
          msg: 'Error al registrar usuario'
        });
      }
    } else {
      res.json({
        status: 'ERROR',
        // data: 'Email already exist'
        data: 'Usuario ya existe'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id
  const data = req.body;

  try {
    const user = await User.findOne({ where: { id: id } });

    if (user) {
      const salt = await bcryptjs.genSalt()
      const hash = await bcryptjs.hash(data.password, salt)

      const user = await User.update(
        { firstName: data.firstName, lastName: data.lastName, username: data.username, password: hash },
        { where: { id: id } }
      )

      if (user) {
        res.status(200).json({
          status: 'SUCCESS',
          data: 'Usuario actualizado exitosamente'
        })
      } else {
        res.status(200).json({
          status: 'ERROR',
          // data: 'User not found'
          data: 'Usuario no encontrado'
        })
      }
    } else {
      return res.status(200).json({
        status: 'ERROR',
        // data: 'User not found'
        data: 'Usuario no encontrado'
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ where: { id: id } })

    if (user) {
      user.destroy().then(
        res.status(200).json({
          status: 'SUCCESS'
        })
      )
    } else {
      res.status(200).json({
        status: 'ERROR',
        // data: 'User not found'
        data: 'Usuario no encontrado'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      // data: 'Something goes wrong'
      data: 'Lo sentimos, pero estamos experimentando problemas con nuestro servicio en este momento, por favor intenta más tarde. Gracias por tu paciencia.'
    })
  }
}