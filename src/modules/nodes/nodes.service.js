import Node from '../../models/Node.js'
import {
  createAlfrescoNodes,
  getAlfrescoContent,
  getAlfrescoNodeInfo,
  getAlfrescoNodesChildrens,
  uploadAlfrescoContent
} from './alfresco.nodes.service.js'
// GET
export const getNodes = async ({ ticket, idNode }) => {
  try {
    const nodes = await getAlfrescoNodesChildrens({ ticket, idNode })

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
      nodes
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

export const uploadContent = async ({ ticket, idNode, nodeData, file }) => {
  try {
    const { name, /*  nodeType,  */ title, description, typeDocument } = nodeData
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
        /* nodeType, */ //! solo mandar folder | content . NO => cm:folder | cm:content
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
    console.log(nodeContent)
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
