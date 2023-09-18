import fetch from 'node-fetch'
import { toConvertBase64 } from '../../helpers/convert-base64.js'

// GET
export const getAlfrescoGroups = async ({ ticket }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    const response = await fetch(
            `http://${URL_HOST}:8080/${URL_CORE_API}/groups`,
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

export const createAlfrescoGroup = async ({ ticket, groupData }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    const { id, displayName, parentIds } =
              groupData

    if (!id || !displayName) {
      return {
        ok: false,
        msg: 'Ocurrió algo con el servidor'
      }
    }
    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/groups`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify({ id, displayName, parentIds })
              }
    )
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

// DELETE
export const deleteAlfrescoGroup = async ({ ticket, idGroup }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)

    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/groups/${idGroup}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                }
              }
    )
    const data = await response
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const createAlfrescoMemberGroup = async ({ ticket, idGroup, idMember }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const dataMember = {
      id: idMember,
      memberType: 'PERSON'
    }

    const token = toConvertBase64(ticket)

    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/groups/${idGroup}/members`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify(dataMember)
              }
    )
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}
