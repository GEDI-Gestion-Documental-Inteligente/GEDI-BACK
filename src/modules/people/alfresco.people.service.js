// Importar NodeFetch
import fetch from 'node-fetch'
import { toConvertBase64 } from '../../helpers/convert-base64.js'

// GET

export const getAlfrescoPeople = async ({ ticket }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people`,
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

// POST
export const createAlfrescoPerson = async ({ ticket, personData }) => {
  const URL_CORE_API = process.env.URL_CORE_API
  const URL_HOST = process.env.URL_HOST
  try {
    const token = toConvertBase64(ticket)
    const { id, firstName, lastName, email, password, skypeId, jobTitle } =
              personData
    // "id" es el username de alfresco
    if (!id || !firstName || !lastName || !email || !password || !skypeId || !jobTitle) {
      return {
        ok: false,
        msg: 'Ocurrió algo con el servidor'
      }
    }
    // Enviar la persona a Alfresco
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify({ id, firstName, lastName, email, password, skypeId, jobTitle }) // Enviar los datos de la persona a Alfresco
              }
    )

    const data = await response.json()
    console.log(data)

    return data
  } catch (error) {
    console.log(error)
  }
}

// GET ACTIVITIES
export const getAlfrescoPeopleActivities = async ({ ticket, userId }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)

    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/${userId}/activities`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                }
              }
    )
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
