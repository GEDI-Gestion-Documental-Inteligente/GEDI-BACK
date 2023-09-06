// Importar NodeFetch
import { getAlfrescoTicket } from './alfresco.auth.service'
// import helpers
import { generarJwt } from '../../helpers/generar-jwt.js'
// Configurar URL's por defecto

export const authLogin = async ({ userId, password }) => {
  try {
    const auth = await getAlfrescoTicket({ userId, password })

    if (!auth.entry.id) {
      return {
        ok: false,
        status: 404,
        msg: 'Autenticación fallida.'
      }
    }

    const authTicket = auth.entry

    const token = await generarJwt(authTicket, process.env.SECRET)
    return {
      ok: true,
      status: 200,
      msg: 'Autenticado correctamente.',
      token
    }
  } catch (error) {
    return error
  }
}
