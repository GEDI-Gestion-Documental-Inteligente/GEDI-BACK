import jwt from 'jsonwebtoken'

export const validarJwt = (req, res, next) => {
  const token = req.header('Authorization')
  // Verificar si no existen cookies o si no hay un token en las cookies
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición.'
    })
  }
  try {
    // Verificar si el token es válido
    const decoded = jwt.verify(token, process.env.SECRET)

    // Si el token es válido, extraer el uid del usuario
    req.ticket = decoded.uid.id
    req.userId = decoded.uid.userId

    console.log(req.ticket)
    // Puedes continuar con otras validaciones o acciones aquí, como buscar el usuario en la base de datos

    next()
  } catch (error) {
    // Manejar el caso en el que el token no sea válido
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }
}
