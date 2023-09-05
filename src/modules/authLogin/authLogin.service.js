// Importar NodeFetch
import fetch from "node-fetch";
// import helpers
import { generarJwt } from "../../helpers/generar-jwt.js"
// Configurar URL's por defecto

// Autenticar Usuario
const getAlfrescoTicket = async ({ userId, password }) => {
    const URL_AUTH_API = process.env.URL_AUTH_API;
    const URL_HOST = process.env.URL_HOST;
    
    try {
        if (!userId || !password) {
            return {
                ok: false,
                msg: "Faltan datos",
                param: !userId ? "userId" : "password",
            }
        }
        const response = await fetch(`http://${URL_HOST}:8080/${URL_AUTH_API}/tickets`, {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify({ userId, password }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
        return {
            ok: false,
            msg: "Ocurrió algo con el servidor"
        }
    }
};

export const authLogin = async ({ userId, password }) => {
    try {

        const auth = await getAlfrescoTicket({ userId, password });

        if (!auth.entry.id) {
            return {
                ok: false,
                msg: "Autenticación fallida.",
            };
        }

        const authTicket = auth.entry

        const token = await generarJwt(authTicket, process.env.SECRET);
        return {
            ok: true,
            msg: "Autenticado correctamente.",
            token
        };
    } catch (error) {
        return error
    }
}