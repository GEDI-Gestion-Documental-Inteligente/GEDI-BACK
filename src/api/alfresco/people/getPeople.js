// Importar NodeFetch
import fetch from "node-fetch";
import { toConvertBase64 } from "../../../helpers/convert-base64.js";

// Configurar URL's por defecto
const URL_CORE_API = "alfresco/api/-default-/public/alfresco/versions/1";
// Autenticar Usuario
export const getAlfrescoPeople = async (ticket) => {
  try {
    const token = toConvertBase64(ticket);
    console.log(token);
    const response = await fetch(
      `http://localhost:8080/${URL_CORE_API}/people`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
