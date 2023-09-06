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
