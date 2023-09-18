import { createAlfrescoGroup, createAlfrescoMemberGroup, deleteAlfrescoGroup, getAlfrescoGroups } from './alfresco.groups.service.js'

export const getGroups = async ({ ticket }) => {
  try {
    const groups = await getAlfrescoGroups({ ticket })

    if (groups.error) {
      return {
        ok: false,
        status: groups.error.statusCode,
        msg: 'Hubo un error en alfresco.',
        error: groups.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'groups:',
      groups
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

export const createGroup = async ({ ticket, groupData }) => {
  try {
    const { id, displayName, parentIds } =
              groupData

    // Validar los datos de entrada
    if (!id || !displayName) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos'
      }
    }

    // Crear el Grupo en Alfresco
    const alfrescoGroup = await createAlfrescoGroup({
      ticket,
      groupData: {
        id,
        displayName,
        parentIds
      }
    })

    return {
      ok: true,
      status: 201,
      msg: 'Grupo creado en alfresco',
      alfrescoGroup
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

export const deleteGroup = async ({ ticket, idGroup }) => {
  try {
    const groupDeleted = await deleteAlfrescoGroup({ ticket, idGroup })

    if (groupDeleted.error) {
      return {
        ok: false,
        status: groupDeleted.error.statusCode,
        msg: 'Hubo un error en alfresco.',
        error: groupDeleted.error.errorKey
      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Archivo eliminado correctamente'
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

export const createGroupMember = async ({ ticket, idGroup, idMember }) => {
  try {
    console.log(ticket)
    const createdMember = await createAlfrescoMemberGroup({ ticket, idGroup, idMember })

    if (createdMember.error) {
      return {
        ok: false,
        status: createdMember.error.statusCode,
        msg: 'Hubo un error en alfresco.',
        error: createdMember.error.errorKey
      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Miembro asignado correctamente',
      createdMember
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
