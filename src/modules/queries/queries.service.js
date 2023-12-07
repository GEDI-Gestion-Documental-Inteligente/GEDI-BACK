import { alfrescoSearchNodes, alfrescoSearchPeople, alfrescoSearchSites, alfrescoSearchWithTerm } from './alfresco.queries.service.js'

export const sendQueriesWithTerm = async ({ ticket, term }) => {
  try {
    const resultQuery = await alfrescoSearchWithTerm({ ticket, term })

    if (resultQuery.error) {
      return {
        ok: false,
        status: resultQuery.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: resultQuery.error.errorKey
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

export const sendQueriesForNodes = async ({ ticket, term, root }) => {
  try {
    const resultQuery = await alfrescoSearchNodes({ ticket, term, root })

    if (resultQuery.error) {
      return {
        ok: false,
        status: resultQuery.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: resultQuery.error.errorKey
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

export const sendQueriesForSites = async ({ ticket, term }) => {
  try {
    const resultQuery = await alfrescoSearchSites({ ticket, term })

    if (resultQuery.error) {
      return {
        ok: false,
        status: resultQuery.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: resultQuery.error.errorKey
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

export const sendQueriesForPeople = async ({ ticket, term }) => {
  try {
    const resultQuery = await alfrescoSearchPeople({ ticket, term })

    if (resultQuery.error) {
      return {
        ok: false,
        status: resultQuery.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: resultQuery.error.errorKey
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
