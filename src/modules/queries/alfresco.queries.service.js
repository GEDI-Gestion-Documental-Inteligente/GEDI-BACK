import fetch from 'node-fetch'
import { toConvertBase64 } from '../../helpers/convert-base64.js'

// endopoint para realizar busquedas en base a un termino definido
export const alfrescoSearchWithTerm = async ({ ticket, term }) => {
  const URL_SEARCH_API = process.env.URL_SEARCH_API
  const URL_HOST = process.env.URL_HOST
  const token = toConvertBase64(ticket)
  try {
    const termQuery = term.term
    const response = await fetch(`http://${URL_HOST}:8080/${URL_SEARCH_API}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      },
      body: JSON.stringify({
        query: {
          // eslint-disable-next-line no-useless-escape
          query: `(name:\'${termQuery}*\' OR title:\'${termQuery}*\')`
        },
        highlight: {
          fields: [
            {
              field: 'cm:name',
              prefix: '(',
              postfix: ')'
            },
            {
              field: '{http://www.alfresco.org/model/content/1.0}title'
            }
          ]
        }
      })
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

// endpoint para realizar busquedas por Sitios/nodes/people
