import { getAlfrescoSites } from './api/getAlfrescoSites'
import { createAlfrescoSite } from './api/createAlfrescoSites'

// GET
export const getSites = async ({ ticket }) => {
  try {
    const sites = await getAlfrescoSites({ ticket })

    if (!sites) {
      return {
        ok: false,
        status: 404,
        msg: 'No hay sites'
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'sites:',
      sites
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

// POST

export const createSite = async ({ ticket, siteData }) => {
  try {
    const { id, title, description, visibility } =
            siteData

    // Validar los datos de entrada
    if (!id || !title || !description || !visibility) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos'
      }
    }

    // Crear el sitio en Alfresco
    const alfrescoSite = await createAlfrescoSite({
      ticket,
      siteData: {
        id,
        title,
        description,
        visibility
      }
    })

    return {
      ok: true,
      status: 201,
      msg: 'Sitio creado en alfresco',
      alfrescoSite
    }
  } catch (error) {
    console.error('Error:', error.message)
    return {
      ok: false,
      status: 500,
      msg: 'Error al procesar la solicitud'
    }
  }
}
