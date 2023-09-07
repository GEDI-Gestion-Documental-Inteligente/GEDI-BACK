import fetch from 'node-fetch'
import { toConvertBase64 } from '../../helpers/convert-base64.js'

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
    const content = await response.blob()
    return content.type
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
    const { name, nodeType, title, description } = nodeData
    let bodyData = {
      name,
      nodeType: `cm:${nodeType}`
    }
    if (!name || !nodeType) {
      return {
        ok: false,
        msg: 'Ocurrió algo con el servidor'
      }
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
