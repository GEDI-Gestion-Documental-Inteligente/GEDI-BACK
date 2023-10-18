import fetch from 'node-fetch'
import { toConvertBase64 } from '../../helpers/convert-base64.js'
import FormData from 'form-data'
import fs from 'fs'
// GET
export const getAlfrescoNodesChildrens = async ({ ticket, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}/children`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      }
    })
    const data = await response.json()
    // console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
}

// GET
export const getAlfrescoNodesParents = async ({ ticket, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}/parents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      }
    })
    const data = await response.json()
    // console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
}

// GET NODE INFORMATION

export const getAlfrescoNodeInfo = async ({ ticket, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      }
    })
    const data = await response.json()
    // console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
}

// GET CONTENT ALFRESCO (POSIBLE DOWNLOAD?)

export const getAlfrescoContent = async ({ ticket, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    console.log(token)
    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}/content`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      }
    })
    const content = await response.buffer()
    return content
  } catch (error) {
    console.log(error)
  }
}

// POST

export const createAlfrescoNodes = async ({ ticket, nodeData, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    const { name, title, description, nodeType } = nodeData
    let bodyData = {
      name,
      nodeType
    }
    if (title && description) {
      bodyData = { ...bodyData, properties: { 'cm:title': title, 'cm:description': description } }
    }
    // console.log(token);
    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}/children`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{id}/children

export const uploadAlfrescoContent = async ({ ticket, nodeData, idNode, file }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST
    const token = toConvertBase64(ticket)
    // se omiten los campos nombre y nodetype ya que no son necesarios (alfresco detecta que es type content)
    const { name, title, description, typeDocument } = nodeData
    console.log(nodeData)

    // se obtiene el buffer del archivo
    const fileContent = fs.readFileSync(file.path)

    // Crear un objeto FormData para enviar el archivo
    const formData = new FormData()
    formData.append('filedata', fileContent, {
      filename: `${file.originalname}`, // Utiliza el nombre original del archivo
      contentType: file.mimetype // Especifica el tipo de contenido
    })
    formData.append('name', name)
    if (title && description && typeDocument) {
      formData.append('cm:title', title)
      formData.append('cm:description', description)
      formData.append('cm:type', typeDocument)
    }

    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}/children`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`
      },
      body: formData // Enviar FormData en lugar de JSON
    })

    const data = await response.json()
    fs.unlink(`${file.path}`, (error) => {
      if (error) {
        console.error(error)
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

// PUT

export const updateAlfrescoNode = async ({ ticket, nodeData, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST
    const token = toConvertBase64(ticket)
    // se omiten los campos nombre y nodetype ya que no son necesarios (alfresco detecta que es type content)
    const { name, title, description } = nodeData
    console.log(nodeData)

    const bodyData = {
      name,
      properties: {
        'cm:title': title,
        'cm:description': description
      }
    }

    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${token}`
      },
      body: JSON.stringify(bodyData) // Enviar FormData en lugar de JSON
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// PUT

export const updateTypeAlfrescoNode = async ({ ticket, nodeData, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST
    const token = toConvertBase64(ticket)
    // se omiten los campos nombre y nodetype ya que no son necesarios (alfresco detecta que es type content)
    const { typeDocument } = nodeData

    const bodyData = {
      properties: {
        'cm:type': typeDocument
      }
    }

    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${token}`
      },
      body: JSON.stringify(bodyData) // Enviar FormData en lugar de JSON
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updatePermissionsAlfrescoNode = async ({ ticket, nodeData, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    const { authorityId, name, accessStatus } = nodeData

    const bodyData = {
      permissions: {
        isInheritanceEnabled: false,
        locallySet: [
          {
            authorityId,
            name,
            accessStatus
          }
        ]
      }
    }
    // console.log(token);
    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// DELETE
export const deleteAlfrescoNode = async ({ ticket, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}?permanent=true`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                }
              }
    )
    if (response.status === 204) {
      return response
    }
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

// POST

export const moveAlfrescoNode = async ({ ticket, idNode, targetId }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    const bodyData = {
      targetParentId: targetId
    }
    // console.log(token);
    const response = await fetch(`http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
