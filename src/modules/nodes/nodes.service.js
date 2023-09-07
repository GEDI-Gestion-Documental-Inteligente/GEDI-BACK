import { getAlfrescoContent, getAlfrescoNodes } from './alfresco.nodes.service.js'
// GET
export const getNodes = async ({ ticket, idNode }) => {
  try {
    const nodes = await getAlfrescoNodes({ ticket, idNode })

    if (!nodes) {
      return {
        ok: false,
        status: 404,
        msg: 'No hay nodes'
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'nodes:',
      nodes
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Ocurrio un error en el servidor'
    }
  }
}

// GET CONTENT

export const getNodeContent = async ({ ticket, idNode }) => {
  try {
    const content = await getAlfrescoContent({ ticket, idNode })
    if (!content) {
      return {
        ok: false,
        status: 404,
        msg: 'No se ha encontrado el archivo'
      }
    }
    return {
      ok: true,
      status: 200,
      msg: 'Contenido del archivo:',
      content
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Ocurrio un error en el servidor'
    }
  }
}

// export const createNodes = async ({ ticket, siteData }) => {
//     try {
//         const { id, title, description, visibility } =
//             siteData;

//         // Validar los datos de entrada
//         if (!id || !title || !description || !visibility) {
//             return {
//                 ok: false,
//                 status:400,
//                 msg: "Los campos obligatorios son requeridos"
//             }
//         }

//         // Crear el sitio en Alfresco
//         const alfrescoNodes = await createAlfrescoNodes({
//             ticket, siteData: {
//                 id,
//                 title,
//                 description,
//                 visibility
//             }
//         });

//         return {
//             ok: true,
//             status: 201,
//             msg: "Sitio creado en alfresco",
//             alfrescoNodes
//         };
//     } catch (error) {
//         console.error("Error:", error.message);
//         return {
//             ok: false,
//             status: 500,
//             msg: "Error al procesar la solicitud"
//         };
//     }};
