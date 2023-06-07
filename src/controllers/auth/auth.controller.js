// import { pool } from '../../db.js'
import { generateJWT } from '../../helpers/generateJWT.js';
import bcryptjs from "bcryptjs";
import { User } from "../../db.js";

export const logIn = async (req, res) => {
  const { body } = req
  const username = body.username;
  const password = body.password;

  const data = req.body;

  try {
    User.findOne({
      where: { username: data.username }
    }).then(async response => {
      if (response) {
        const validatePassword = await bcryptjs.compare(data.password, response.password);
        const userData = response;

        if (!validatePassword) {
          res.json({
            status: 'Error',
            // data: 'Incorrect Password! Please try again'
            data: 'Contraseña incorrecta Por favor, inténtelo de nuevo'
          })
        } else {
          const token = await generateJWT(userData.id, userData.firstName, userData.lastName, userData.username, userData.password, userData.profile)

          if (token.length == 0) {
            res.json({
              status: 'Error',
              data: 'Error token'
            })
          } else {
            User.update({ token: token }, { where: { username: data.username } }).then(reponse => {
              if (response) {
                res.send({
                  status: 'SUCCESS',
                  data: token,
                  id: userData.id,
                  profile: userData.profile,
                  username: userData.username
                })
              } else {
                res.send({
                  status: 'ERROR',
                  // data: 'Error insert token'
                  data: 'Error al insertar token'
                })
              }
            })
          }
        }
      } else {
        res.json({
          status: 'Error',
          // data: 'Incorrect Email! Please try again'
          data: 'Correo electrónico incorrecto Por favor, inténtelo de nuevo'
        })
      }
    })

    // const [users] = await pool.query('SELECT * FROM t_user WHERE t_user.username = ?', [username])

    // if (users.length === 0) {
    //   res.json({
    //     status: 'Error',
    //     // data: 'Incorrect Email! Please try again'
    //     data: 'Correo electrónico incorrecto Por favor, inténtelo de nuevo'
    //   })
    // } else {
    //   const validatePassword = await bcryptjs.compare(password, users[0].password)

    //   if (!validatePassword) {
    //     res.json({
    //       status: 'Error',
    //       // data: 'Incorrect Password! Please try again'
    //       data: 'Contraseña incorrecta Por favor, inténtelo de nuevo'
    //     })
    //   } else {
    //     const token = await generateJWT(users[0].id, users[0].firstName, users[0].lastName, users[0].username, users[0].password, users[0].profile)

    //     if (token.length === 0) {
    //       res.json({
    //         status: 'Error',
    //         data: 'Error token'
    //       })
    //     } else {
    //       const [rows] = await pool.query('UPDATE t_user SET token = ? WHERE id = ?', [token, users[0].id])

    //       if (rows.affectedRows > 0) {
    //         res.send({
    //           status: 'SUCCESS',
    //           data: token,
    //           id: users[0].id,
    //           profile: users[0].profile,
    //           username: users[0].username
    //         })
    //       } else {
    //         res.send({
    //           status: 'ERROR',
    //           // data: 'Error insert token'
    //           data: 'Error al insertar token'
    //         })
    //       }
    //     }
    //   }
    // }

  } catch (error) {
    res.status(500).json({
      status: 'Error',
      // data: 'An error has occurred'
      data: 'Ha ocurrido un error'
    })
  }
}

export const logOut = async (req, res) => {
  const { body } = req
  const idUser = body.idUser;

  const [session] = await pool.query('SELECT * FROM t_user WHERE id = ?', [idUser])

  if (session[0].token !== null) {
    const [rows] = await pool.query('UPDATE t_user SET token = null WHERE id = ?', [session[0].id])

    if (rows.affectedRows > 0) {
      res.status(200).json({
        status: 'SUCCESS',
      })
    } else {
      res.json({
        status: 'ERROR',
      })
    }

  } else {
    res.json({
      status: 'ERROR',
      data: 'El usuario no ha iniciado sesión.'
    });
  }
}