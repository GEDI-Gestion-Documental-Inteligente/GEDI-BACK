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

export const getAlfrescoOnePerson = async ({ ticket, idPerson }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/${idPerson}`,
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

// PUT
export const updateAlfrescoPerson = async ({ ticket, idPerson, personData }) => {
  const URL_CORE_API = process.env.URL_CORE_API
  const URL_HOST = process.env.URL_HOST
  try {
    const token = toConvertBase64(ticket)
    const { firstName, lastName, email, skypeId, jobTitle } =
              personData
    const bodyData = {
      firstName,
      lastName,
      email,
      skypeId,
      jobTitle
    }
    // Enviar la persona a Alfresco
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/${idPerson}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify(bodyData) // Enviar los datos de la persona a Alfresco
              }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

// PUT
export const updatePassAlfrescoPerson = async ({ ticket, idPerson, personData }) => {
  const URL_CORE_API = process.env.URL_CORE_API
  const URL_HOST = process.env.URL_HOST
  try {
    const token = toConvertBase64(ticket)
    const { oldPassword, password } =
              personData
    const bodyData = {
      oldPassword,
      password
    }
    // Enviar la persona a Alfresco
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/${idPerson}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify(bodyData) // Enviar los datos de la persona a Alfresco
              }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

// PUT
export const manageAlfrescoPersonStatus = async ({ ticket, idPerson, personData }) => {
  const URL_CORE_API = process.env.URL_CORE_API
  const URL_HOST = process.env.URL_HOST
  try {
    const token = toConvertBase64(ticket)
    const { enabled } =
              personData
    const bodyData = {
      enabled
    }
    // Enviar la persona a Alfresco
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/${idPerson}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify(bodyData) // Enviar los datos de la persona a Alfresco
              }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

// POST CREATE A SITE MEMBERSHIP REQUEST

export const createAlfrescoMemberRequest = async ({ ticket, requestData }) => {
  const URL_CORE_API = process.env.URL_CORE_API
  const URL_HOST = process.env.URL_HOST
  try {
    const token = toConvertBase64(ticket)
    const { message, id, title } = requestData
    const bodyData = {
      message,
      id,
      title
    }
    // Enviar la persona a Alfresco
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/-me-/site-membership-requests`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify(bodyData) // Enviar los datos de la persona a Alfresco
              }
    )

    const data = await response.json()
    console.log(response)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteAlfrescoMemberRequest = async ({ ticket, siteId }) => {
  const URL_CORE_API = process.env.URL_CORE_API
  const URL_HOST = process.env.URL_HOST
  try {
    const token = toConvertBase64(ticket)
    // Enviar la persona a Alfresco
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/-me-/site-membership-requests/${siteId}`,
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
