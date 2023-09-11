import { getAlfrescoSites, createAlfrescoSite, deleteAlfrescoSite, createSiteMemberAlfresco, createGroupMemberAlfresco } from './alfresco.sites.service.js'

// GET
export const getSites = async ({ ticket }) => {
  try {
    const sites = await getAlfrescoSites({ ticket })

    if (!sites) {
      return {
        ok: false,
        status: 404,
        msg: 'No se han encontrado sitios'
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

// DELETE

export const deleteSite = async ({ ticket, idSite }) => {
  try {
    const siteDeleted = await deleteAlfrescoSite({ ticket, idSite })

    if (!siteDeleted) {
      return {
        ok: false,
        status: 404,
        msg: 'No se ha encontrado el sitio'
      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Archivo eliminado correctamente',
      siteDeleted
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

export const createSiteMember = async ({ ticket, idSite, personData }) => {
  try {
    const alfrescoSiteMember = await createSiteMemberAlfresco({ ticket, idSite, personData })
    if (alfrescoSiteMember.error) {
      return {
        ok: false,
        status: alfrescoSiteMember.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: alfrescoSiteMember.error.errorKey
      }
    }
    return {
      ok: true,
      status: 201,
      msg: 'Miembro añadido correctamente',
      alfrescoSiteMember
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

// ENDPOINT DE ALFRESCO PARA AÑADIR GRUPO A UN SITIO NO FUNCIONA EN LA VERSION UTILIZADA
// ESTA EN PRUEBA LA OPCION DE AÑADIR EN BASE A GRUPOS COMO SI FUERA UN ARRAY 1 POR 1 (se testeara su dificultad de implementarlo en frontend)

export const createSiteGroupMember = async ({ ticket, idSite, groupData }) => {
  try {
    const results = []

    for (const group of groupData) {
      const { id, role } = group
      const alfrescoSiteGroupMember = await createGroupMemberAlfresco({ ticket, idSite, groupData: { id, role } })
      console.log(group)
      console.log(alfrescoSiteGroupMember.error)

      if (alfrescoSiteGroupMember.error) {
        results.push({
          ok: false,
          status: alfrescoSiteGroupMember.error.statusCode,
          msg: 'Hubo un error en alfresco',
          error: alfrescoSiteGroupMember.error.errorKey
        })
      } else {
        results.push({
          ok: true,
          status: 201,
          msg: 'Grupo añadido correctamente',
          alfrescoSiteGroupMember
        })
      }
    }

    return results
  } catch (error) {
    console.error('Error:', error.message)
    return {
      ok: false,
      status: 500,
      msg: 'Error al procesar la solicitud'
    }
  }
}
