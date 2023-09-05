import fetch from "node-fetch";
import { toConvertBase64 } from "../../helpers/convert-base64.js";
//GET
const getAlfrescoSites = async ({ ticket }) => {
    try {
        const URL_CORE_API = process.env.URL_CORE_API;
        const URL_HOST = process.env.URL_HOST;

        const token = toConvertBase64(ticket);
        // console.log(token);
        const response = await fetch(
            `http://${URL_HOST}:8080/${URL_CORE_API}/sites`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${token}`,
                },
            }
        );
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

//GET
export const getSites = async ({ ticket }) => {
    try {
        const sites = await getAlfrescoSites({ ticket });

        if (!sites) {
            return {
                ok: false,
                status: 404,
                msg: "No hay sites",
            };
        }
        
        return {
            ok: true,
            status: 200,
            msg: "sites:",
            sites,
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            ok: false,
            status: 500,
            msg: "Ocurrio un error en el servidor"
        };
    }
};

//POST

const createAlfrescoSite = async ({ ticket, siteData }) => {
    try {
        const URL_CORE_API = process.env.URL_CORE_API;
        const URL_HOST = process.env.URL_HOST;

        const token = toConvertBase64(ticket);
        const { id, title, description, visibility } =
            siteData;

            if (!id || !title || !description || !visibility) {
                t
                return {
                    ok: false,
                    msg: "Ocurrió algo con el servidor"
                }
            }
        // console.log(token);
        const response = await fetch(
            `http://${URL_HOST}:8080/${URL_CORE_API}/sites`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${token}`,
                },
                body:JSON.stringify({id,title,description,visibility})
            }
        );
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const createSite = async ({ ticket, siteData }) => {
    try {
        const { id, title, description, visibility } =
            siteData;

        // Validar los datos de entrada
        if (!id || !title || !description || !visibility) {
            return {
                ok: false,
                status:400,
                msg: "Los campos obligatorios son requeridos"
            }
        }

        // Crear el sitio en Alfresco
        const alfrescoSite = await createAlfrescoSite({
            ticket, siteData: {
                id,
                title,
                description,
                visibility
            }
        });


        return {
            ok: true,
            status: 201,
            msg: "Sitio creado en alfresco",
            alfrescoSite
        };
    } catch (error) {
        console.error("Error:", error.message);
        return {
            ok: false,
            status: 500,
            msg: "Error al procesar la solicitud"
        };
    }
};



