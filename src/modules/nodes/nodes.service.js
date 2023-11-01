import Node from '../../models/Node.js'
import {
  createAlfrescoNodes,
  deleteAlfrescoNode,
  getAlfrescoContent,
  getAlfrescoNodeInfo,
  getAlfrescoNodesChildrens,
  getAlfrescoNodesParents,
  moveAlfrescoNode,
  updateAlfrescoNode,
  updatePermissionsAlfrescoNode,
  updateTypeAlfrescoNode,
  uploadAlfrescoContent
} from './alfresco.nodes.service.js'
// GET
export const getNodes = async ({ ticket, idNode }) => {
  try {
    const nodes = await getAlfrescoNodesChildrens({ ticket, idNode })
    const nodesMongo = await Node.find()

    if (nodes.error) {
      return {
        ok: false,
        status: nodes.error.statusCode,
        msg: 'Hubo un error en alfresco.',
        error: nodes.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'nodes:',
      nodes,
      nodesMongo
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Ocurrio un error en el servidor.'
    }
  }
}

// GET

export const getNodeParents = async ({ ticket, idNode }) => {
  try {
    const parentNodes = await getAlfrescoNodesParents({ ticket, idNode })

    if (parentNodes.error) {
      return {
        ok: false,
        status: parentNodes.error.statusCode,
        msg: 'Hubo un error en alfresco.',
        error: parentNodes.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'parents node:',
      parentNodes
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Ocurrio un error en el servidor.'
    }
  }
}

// GET CONTENT

export const getNodeContent = async ({ ticket, idNode }) => {
  try {
    const content = await getAlfrescoContent({ ticket, idNode })
    if (content.error) {
      return {
        ok: false,
        status: content.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: content.error.errorKey
      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Contenido del archivo:',
      content
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Ocurrio un error en el servidor.'
    }
  }
}

// GET NODE INFORMATION

export const getNodeInfo = async ({ ticket, idNode }) => {
  try {
    const node = await getAlfrescoNodeInfo({ ticket, idNode })
    if (node.error) {
      return {
        ok: false,
        status: node.error.statusCode,
        msg: 'Hubo un error en alfresco.',
        error: node.error.errorKey
      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Informacion del nodo:',
      node
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Ocurrio un error en el servidor.'
    }
  }
}

export const createFolder = async ({ ticket, idNode, nodeData }) => {
  try {
    const { name, title, description } = nodeData
    if (!idNode) {
      return {
        ok: false,
        status: 403,
        msg: 'Se requiere id del nodo'
      }
    }
    // Crear el sitio en Alfresco
    const alfrescoNodes = await createAlfrescoNodes({
      ticket,
      idNode,
      nodeData: {
        name,
        nodeType: 'cm:folder',
        title,
        description
      }
    })
    if (alfrescoNodes.error) {
      return {
        ok: false,
        status: alfrescoNodes.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: alfrescoNodes.error.errorKey
      }
    }
    const newNode = new Node({
      name: alfrescoNodes.entry.name,
      createdByUser: alfrescoNodes.entry.createdByUser,
      nodeType: alfrescoNodes.entry.nodeType,
      parentId: alfrescoNodes.entry.parentId,
      id: alfrescoNodes.entry.id,
      properties: alfrescoNodes.entry.properties,
      buffer: null
    })

    const mongoNode = await newNode.save()
    return {
      ok: true,
      status: 201,
      msg: 'Folder creada correctamente',
      alfrescoNodes,
      mongoNode
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

export const updatePermissionsNode = async ({ ticket, idNode, nodeData }) => {
  try {
    const { authorityId, name, accessStatus } = nodeData
    if (!idNode) {
      return {
        ok: false,
        status: 403,
        msg: 'Se requiere id del nodo'
      }
    }

    if (!authorityId || !name || !accessStatus) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos'
      }
    }
    // Crear el sitio en Alfresco
    const changedPermissions = await updatePermissionsAlfrescoNode({
      ticket,
      idNode,
      nodeData: {
        authorityId,
        name,
        accessStatus
      }
    })
    if (changedPermissions.error) {
      return {
        ok: false,
        status: changedPermissions.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: changedPermissions.error.errorKey
      }
    }
    return {
      ok: true,
      status: 201,
      msg: 'Permisos actualizados correctamente',
      changedPermissions
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

export const uploadContent = async ({ ticket, idNode, nodeData, file }) => {
  try {
    const { name, title, description, typeDocument } = nodeData
    if (!idNode) {
      return {
        ok: false,
        status: 403,
        msg: 'Se requiere id del nodo'
      }
    }
    // Crear el sitio en Alfresco
    const alfrescoContent = await uploadAlfrescoContent({
      ticket,
      idNode,
      file,
      nodeData: {
        name,
        title,
        description,
        typeDocument
      }
    })
    if (alfrescoContent.error) {
      return {
        ok: false,
        status: alfrescoContent.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: alfrescoContent.error.errorKey
      }
    }
    const idCreatedContent = alfrescoContent.entry.id
    const nodeContent = await getAlfrescoContent({ ticket, idCreatedContent })
    console.log(idCreatedContent)
    console.log(alfrescoContent.entry.createdByUser)
    const newNode = new Node({
      createdByUser: alfrescoContent.entry.createdByUser,
      name: alfrescoContent.entry.name,
      nodeType: alfrescoContent.entry.nodeType,
      parentId: alfrescoContent.entry.parentId,
      id: alfrescoContent.entry.id,
      properties: { ...alfrescoContent.entry.content, ...alfrescoContent.entry.properties },
      buffer: nodeContent
    })

    const mongoNode = await newNode.save()

    return {
      ok: true,
      status: 201,
      msg: 'Contenido subido correctamente',
      alfrescoContent,
      mongoNode
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

export const updateNode = async ({ ticket, idNode, nodeData }) => {
  try {
    const { name, title, description } = nodeData
    if (!idNode) {
      return {
        ok: false,
        status: 403,
        msg: 'Se requiere id del nodo'
      }
    }
    if (!name || !title || !description) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos'
      }
    }
    // Crear el sitio en Alfresco
    const updatedNode = await updateAlfrescoNode({
      ticket,
      idNode,
      nodeData: {
        name,
        title,
        description
      }
    })
    if (updatedNode.error) {
      return {
        ok: false,
        status: updatedNode.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: updatedNode.error.errorKey
      }
    }

    const updatedNodeMongo = await Node.findOneAndUpdate(
      { id: idNode },
      {
        $set: {
          name,
          'properties.cm:title': title,
          'properties.cm:description': description
        }
      },
      { new: true }
    )

    if (!updatedNodeMongo) {
      return {
        ok: false,
        status: 404,
        msg: 'No se encontró el sitio en MongoDB'
      }
    }

    return {
      ok: true,
      status: 201,
      msg: 'Nodo actualizado correctamente',
      updatedNode,
      updatedNodeMongo
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

export const updateTypeNode = async ({ ticket, idNode, nodeData }) => {
  try {
    const { typeDocument } = nodeData
    if (!idNode) {
      return {
        ok: false,
        status: 403,
        msg: 'Se requiere id del nodo'
      }
    }
    if (!typeDocument) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos'
      }
    }
    // Crear el sitio en Alfresco
    const updatedTypeNode = await updateTypeAlfrescoNode({
      ticket,
      idNode,
      nodeData: {
        typeDocument
      }
    })
    if (updatedTypeNode.error) {
      return {
        ok: false,
        status: updatedTypeNode.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: updatedTypeNode.error.errorKey
      }
    }

    const updatedTypeNodeMongo = await Node.findOneAndUpdate(
      { id: idNode },
      {
        $set: {
          'properties.cm:type': typeDocument
        }
      },
      { new: true }
    )

    if (!updatedTypeNodeMongo) {
      return {
        ok: false,
        status: 404,
        msg: 'No se encontró el sitio en MongoDB'
      }
    }

    return {
      ok: true,
      status: 201,
      msg: 'Nodo actualizado correctamente',
      updatedTypeNode,
      updatedTypeNodeMongo
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

export const deleteNode = async ({ ticket, idNode }) => {
  try {
    const alfrescoNodeDeleted = await deleteAlfrescoNode({ ticket, idNode })
    const mongoNodeDeleted = await Node.findOneAndDelete({ id: idNode })
    if (alfrescoNodeDeleted.error) {
      return {
        ok: false,
        status: alfrescoNodeDeleted.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: alfrescoNodeDeleted.error.errorKey

      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Nodo eliminado correctamente',
      mongoNodeDeleted
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

export const moveNode = async ({ ticket, idNode, targetId }) => {
  try {
    const alfrescoNodeMoved = await moveAlfrescoNode({ ticket, idNode, targetId })
    const mongoNodeMoved = await Node.findOneAndUpdate(
      { id: idNode },
      {
        $set: {
          parentId: alfrescoNodeMoved.entry.parentId
        }
      },
      { new: true }
    )

    if (alfrescoNodeMoved.error) {
      return {
        ok: false,
        status: alfrescoNodeMoved.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: alfrescoNodeMoved.error.errorKey

      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Nodo movido correctamente',
      alfrescoNodeMoved,
      mongoNodeMoved
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
