// Importar NodeFetch
import { getAlfrescoTicket } from './alfresco.auth.service.js'
// import helpers
import { generarJwt } from '../../helpers/generar-jwt.js'
// Configurar URL's por defecto

export const authLogin = async ({ userId, password }) => {
  try {
    const auth = await getAlfrescoTicket({ userId, password })

    if (auth.error) {
      return {
        ok: false,
        status: auth.error.statusCode,
        msg: 'Hubo un error con Alfresco.',
        error: auth.error.errorKey
      }
    }

    const authTicket = auth.entry

    const token = await generarJwt(authTicket, process.env.SECRET)
    return {
      ok: true,
      status: 200,
      msg: 'Autenticado correctamente.',
      userId,
      token
    }
  } catch (error) {
    return error
  }
}
