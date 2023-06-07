// import { pool } from '../../db.js'
import bcryptjs from "bcryptjs";
import { User } from "../../db.js";

export const getUsers = async (req, res) => {
  try {
    User.findAll().then(users => {
      res.json({
        status: 'SUCCESS',
        data: users
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

export const getUser = async (req, res) => {
  try {
    const id = [req.params.id]
    User.findOne({
      where: {id: id}
    }).then(response => {
      if (response === null) {
        return res.status(404).json({
          status: 'Error',
          // data: 'User not found'
          data: 'Usuario no encontrado'
        })
      } else {
        res.json({
          status: 'SUCCESS',
          data: response
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}

export const createUser = async (req, res) => {
  let data = req.body;
  User.findOne(
    {
      where: {username: data.username}
    }
  ).then(async (response) => {
    if (response === null) {
      const salt = await bcryptjs.genSalt()
      const hash = await bcryptjs.hash(data.password, salt)

      User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: hash,
      }).then((user) => {
        res.json({
          status: 'SUCCESS',
          data: user,
        });
      }).catch((e) => {
        console.log(e);
        res.json({
          status: 'ERROR',
          msg: 'Error al registrar usuario'
        });
      });
    } else {
      res.json({
        status: 'Error',
        // data: 'Email already exist'
        data: 'El correo electrónico ya existe'
      })
    }
  })
}

export const updateUser = async (req, res) => {
  const id = [req.params.id]
  // const id = req.params.id 
  const data = req.body

  try {
    User.findOne({
      where: {id: id}
    }).then(user => {
      if (user) {
        Object.assign(user, data);
        user.save().then(user => res.json(user));

        res.json({
          status: 'SUCCESS',
          data: user
        })
      } else {
        return res.status(200).json({
          status: 'Error',
          // data: 'User not found'
          data: 'Usuario no encontrado'
        })
      }
    }).catch(next);
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    User.findOne({
      where: { id: id }
    }).then(response => {
      if (response) {
        response.destroy().then(
          res.status(200).send() 
        )
      } else {
        return res.status(200).json({
          status: 'Error',
          // data: 'User not found'
          data: 'Usuario no encontrado'
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}