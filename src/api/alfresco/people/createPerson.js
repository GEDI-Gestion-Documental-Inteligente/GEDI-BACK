import fetch from "node-fetch";
import { toConvertBase64 } from "../../../helpers/convert-base64.js";


const URL_CORE_API = "alfresco/api/-default-/public/alfresco/versions/1";

// Función para crear una persona en Alfresco
export const createAlfrescoPerson = async (ticket, personData) => {
  try {
    const token = toConvertBase64(ticket);
    const { id, firstName, lastName, email, password, skypeId, jobTitle } =
      personData;

    // Enviar la persona a Alfresco
    const response = await fetch(
      `http://localhost:8080/${URL_CORE_API}/people`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify(personData), // Enviar los datos de la persona a Alfresco
      }
    );

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
