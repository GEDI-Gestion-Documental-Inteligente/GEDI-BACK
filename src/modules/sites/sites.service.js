import Site from '../../models/SIte.js'
import { getAlfrescoSites, createAlfrescoSite, deleteAlfrescoSite, createSiteMemberAlfresco, getAlfrescoDocumentLibrary, getAlfrescoMySites, getAlfrescoOneSite, updateAlfrescoSite, getSiteMembersAlfresco, getOneSiteMemberAlfresco, updateSiteMemberAlfresco, deleteSiteMemberAlfresco } from './alfresco.sites.service.js'

// GET
export const getSites = async ({ ticket }) => {
  try {
    const sites = await getAlfrescoSites({ ticket })
    const sitesMongo = await Site.find()

    if (sites.error) {
      return {
        ok: false,
        status: sites.error.statusCode,
        msg: 'No se han encontrado sitios',
        error: sites.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'sites:',
      sites,
      sitesMongo
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

// GET

export const getOneSite = async ({ ticket, idSite }) => {
  try {
    const site = await getAlfrescoOneSite({ ticket, idSite })
    const siteMongo = await Site.findOne({ id: idSite })
    if (site.error) {
      return {
        ok: false,
        status: site.error.statusCode,
        msg: 'No se han encontrado sitios',
        error: site.error.errorKey
      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'sites:',
      site,
      siteMongo
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

    if (alfrescoSite.error) {
      return {
        ok: false,
        status: alfrescoSite.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: alfrescoSite.error.errorKey
      }
    }

    const newSite = new Site(alfrescoSite.entry)

    const mongoSite = await newSite.save()
    console.log(mongoSite) // Mostrar por consola para que no joda el linter

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
export const updateSite = async ({ ticket, siteData, idSite }) => {
  try {
    const { title, description, visibility } =
            siteData

    // Validar los datos de entrada
    if (!title || !description || !visibility) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos'
      }
    }

    // Actualizar sitio
    const updatedAlfrescoSite = await updateAlfrescoSite({
      ticket,
      idSite,
      siteData: {
        title,
        description,
        visibility
      }
    })

    if (updatedAlfrescoSite.error) {
      return {
        ok: false,
        status: updatedAlfrescoSite.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: updatedAlfrescoSite.error.errorKey
      }
    }
    const updatedSiteMongo = await Site.findOneAndUpdate(
      { id: idSite },
      {
        title,
        description,
        visibility
      },
      { new: true }
    )

    if (!updatedSiteMongo) {
      return {
        ok: false,
        status: 404,
        msg: 'No se encontró el sitio en MongoDB'
      }
    }

    return {
      ok: true,
      status: 201,
      msg: 'Sitio creado en alfresco',
      updatedAlfrescoSite,
      updatedSiteMongo
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
    const alfrescoSiteDeleted = await deleteAlfrescoSite({ ticket, idSite })
    const mongoSiteDeleted = await Site.findOneAndDelete({ id: idSite })

    if (alfrescoSiteDeleted.error) {
      return {
        ok: false,
        status: alfrescoSiteDeleted.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: alfrescoSiteDeleted.error.errorKey

      }
    }
    return {
      ok: true,
      status: 204,
      msg: 'Sitio eliminado correctamente',
      mongoSiteDeleted
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

// SERVICIOS PARA GESTIONAR MIEMBROS DE UN SITIO

// GET
export const getSiteMembers = async ({ ticket, idSite }) => {
  try {
    const alfrescoSiteMembers = await getSiteMembersAlfresco({ ticket, idSite })
    if (alfrescoSiteMembers.error) {
      return {
        ok: false,
        status: alfrescoSiteMembers.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: alfrescoSiteMembers.error.errorKey
      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Miembros del sitio:',
      alfrescoSiteMembers
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

export const getOneSiteMember = async ({ ticket, idSite, idPerson }) => {
  try {
    const alfrescoSiteMember = await getOneSiteMemberAlfresco({ ticket, idSite, idPerson })
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
      status: 200,
      msg: 'Miembro del sitio:',
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

// POST
export const createSiteMember = async ({ ticket, idSite, personData }) => {
  try {
    const alfrescoSiteMember = await createSiteMemberAlfresco({ ticket, idSite, personData })
    const { id, role } = personData

    if (!id || !role) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos'
      }
    }
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

// UPDATE
export const updateSiteMember = async ({ ticket, idSite, personData, idPerson }) => {
  try {
    const updatedAlfrescoSiteMember = await updateSiteMemberAlfresco({ ticket, idSite, personData, idPerson })
    const { role } = personData

    if (!role) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos'
      }
    }
    if (updatedAlfrescoSiteMember.error) {
      return {
        ok: false,
        status: updatedAlfrescoSiteMember.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: updatedAlfrescoSiteMember.error.errorKey
      }
    }
    return {
      ok: true,
      status: 201,
      msg: 'Miembro actualizado correctamente',
      updatedAlfrescoSiteMember
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
export const deleteSiteMember = async ({ ticket, idSite, idPerson }) => {
  try {
    const deletedAlfrescoSiteMember = await deleteSiteMemberAlfresco({ ticket, idSite, idPerson })

    if (deletedAlfrescoSiteMember.error) {
      return {
        ok: false,
        status: deletedAlfrescoSiteMember.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: deletedAlfrescoSiteMember.error.errorKey
      }
    }
    return {
      ok: true,
      status: 204,
      msg: 'Miembro eliminado correctamente',
      deletedAlfrescoSiteMember
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

// SERVICIOS EXTRA
export const getContainerDocumentLibrary = async ({ ticket, siteName }) => {
  try {
    const containerDocumentLibrary = await getAlfrescoDocumentLibrary({ ticket, siteName })

    if (containerDocumentLibrary.error) {
      return {
        ok: false,
        status: containerDocumentLibrary.error.statusCode,
        msg: 'No se ha encontrado el contenedor',
        error: containerDocumentLibrary.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'Document Library:',
      containerDocumentLibrary
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

export const getMySites = async ({ ticket }) => {
  try {
    const mysites = await getAlfrescoMySites({ ticket })

    if (mysites.error) {
      return {
        ok: false,
        status: mysites.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: mysites.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'Mis sitios:',
      mysites
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
