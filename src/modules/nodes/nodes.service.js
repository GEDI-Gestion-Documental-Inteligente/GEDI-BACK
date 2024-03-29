import {
  createAlfrescoNodes,
  getAlfrescoContent,
  getAlfrescoNodeInfo,
  getAlfrescoNodesChildrens
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

export const createNodes = async ({ ticket, idNode, nodeData }) => {
  try {
    const { name, nodeType, title, description } = nodeData
    if (!idNode) {
      return {
        ok: false,
        status: 403,
        msg: 'Se requiere id del nodo'
      }
    }
    if (nodeType.includes('cm:')) {
      return {
        ok: false,
        status: 403,
        msg: 'No incluya "cm:" dentro del typeNode.'
      }
    }
    // Crear el sitio en Alfresco
    const alfrescoNodes = await createAlfrescoNodes({
      ticket,
      idNode,
      nodeData: {
        name,
        nodeType, //! solo mandar folder | content . NO => cm:folder | cm:content
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
    return {
      ok: true,
      status: 201,
      msg: 'Sitio creado en alfresco.',
      alfrescoNodes
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
