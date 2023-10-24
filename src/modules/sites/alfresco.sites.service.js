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

export const getAlfrescoOneSite = async ({ ticket, idSite }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(
            `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}`,
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

export const updateAlfrescoSite = async ({ ticket, siteData, idSite }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    const { title, description, visibility } =
              siteData

    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify({ title, description, visibility })
              }
    )
    const data = await response.json()
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
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}?permanent=true`,
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

// GET

export const getSiteMembersAlfresco = async ({ ticket, idSite }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST
    const token = toConvertBase64(ticket)

    const response = await fetch(
      `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}/members`,
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

export const getOneSiteMemberAlfresco = async ({ ticket, idSite, idPerson }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST
    const token = toConvertBase64(ticket)

    const response = await fetch(
      `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}/members/${idPerson}`,
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

export const createSiteMemberAlfresco = async ({ ticket, idSite, personData }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const { id, role } =
              personData
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
// PUT
export const updateSiteMemberAlfresco = async ({ ticket, idSite, idPerson, personData }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const { role } =
              personData

    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}/members/${idPerson}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                },
                body: JSON.stringify({ role })
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
export const deleteSiteMemberAlfresco = async ({ ticket, idSite, idPerson }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);

    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${idSite}/members/${idPerson}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                }
              }
    )
    if (response.status === 204) {
      return response.status
    }
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

// SERVICIOS EXTRA
export const getAlfrescoDocumentLibrary = async ({ ticket, siteName }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/sites/${siteName}/containers/documentLibrary`,
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

export const getAlfrescoMySites = async ({ ticket }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);

    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/-me-/sites`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                }
              }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAlfrescoMemberRequests = async ({ ticket, idSite }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);

    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/people/-me-/site-membership-requests`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${token}`
                }
              }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
