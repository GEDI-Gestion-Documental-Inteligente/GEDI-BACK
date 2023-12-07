import fetch from 'node-fetch'
// Autenticar Usuario
export const getAlfrescoTicket = async ({ userId, password }) => {
  const URL_AUTH_API = process.env.URL_AUTH_API
  const URL_HOST = process.env.URL_HOST

  try {
    const response = await fetch(`http://${URL_HOST}:8080/${URL_AUTH_API}/tickets`, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({ userId, password })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      msg: 'Ocurrió algo con el servidor'
    }
  }
}
