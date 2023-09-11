import fetch from 'node-fetch'
import { toConvertBase64 } from '../../helpers/convert-base64.js'

// GET
export const getAlfrescoSites = async ({ ticket }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(
            `http://${URL_HOST}:8080/${URL_CORE_API}/sites`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`
              }
            }
    )
    const data = await response.json()
    // console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createAlfrescoSite = async ({ ticket, siteData }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    const { id, title, description, visibility } =
              siteData

    if (!id || !title || !description || !visibility) {
      return {
        ok: false,
        msg: 'Ocurrió algo con el servidor'
      }
    }
    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify({ id, title, description, visibility })
              }
    )
    const data = await response.json()
    // console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
}

// DELETE
export const deleteAlfrescoSite = async ({ ticket, idSite }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)

    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                }
              }
    )
    const data = await response.json()
    // console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createSiteMemberAlfresco = async ({ ticket, idSite, personData }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const { id, role } =
              personData

    if (!id || !role) {
      return {
        ok: false,
        msg: 'Los campos no llegaron al fetch'
      }
    }
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}/members`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify({ id, role })
              }
    )
    const data = await response.json()
    // console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createGroupMemberAlfresco = async ({ ticket, idSite, groupData }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const { id, role } =
              groupData

    if (!id || !role) {
      return {
        ok: false,
        msg: 'Los campos no llegaron al fetch'
      }
    }
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}/members`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify({ id, role })
              }
    )
    const data = await response.json()
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
