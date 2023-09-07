import { alfrescoSearchWithTerm } from './alfresco.queries.service.js'

export const sendQueriesWithTerm = async ({ ticket, term }) => {
  try {
    const resultQuery = await alfrescoSearchWithTerm({ ticket, term })

    if (!resultQuery) {
      return {
        ok: false,
        status: 404,
        msg: 'No se han encontrado resultados'
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'resultQuery:',
      resultQuery
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Ocurrio un error en el servidor'
    }
  }
}
