import fetch from 'node-fetch'
import { toConvertBase64 } from '../../helpers/convert-base64.js'

// GET
export const getAlfrescoNodes = async ({ ticket, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(
              `http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}/children`,
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

// GET CONTENT ALFRESCO (POSIBLE DOWNLOAD?)

export const getAlfrescoContent = async ({ ticket, idNode }) => {
  try {
    const URL_CORE_API = process.env.URL_CORE_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    // console.log(token);
    const response = await fetch(
                `http://${URL_HOST}:8080/${URL_CORE_API}/nodes/${idNode}/content`,
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

// export const createAlfrescoNodes = async ({ ticket, siteData }) => {
//     try {
//         const URL_CORE_API = process.env.URL_CORE_API;
//         const URL_HOST = process.env.URL_HOST;

//         const token = toConvertBase64(ticket);
//         const { id, title, description, visibility } =
//             siteData;

//             if (!id || !title || !description || !visibility) {
//                 t
//                 return {
//                     ok: false,
//                     msg: "Ocurrió algo con el servidor"
//                 }
//             }
//         // console.log(token);
//         const response = await fetch(
//             `http://${URL_HOST}:8080/${URL_CORE_API}/nodes`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Basic ${token}`,
//                 },
//                 body:JSON.stringify({id,title,description,visibility})
//             }
//         );
//         const data = await response.json();
//         // console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// };
