// Importar NodeFetch
import fetch from "node-fetch";

// Configurar URL's por defecto
const URL_AUTH_API = "alfresco/api/-default-/public/authentication/versions/1";

// Autenticar Usuario
export const getAlfrescoTicket = async (userData) => {
  const { userId, password } = userData;
  if(!userId || !password){
    return res.json({
      message:"No se encuentran los credenciales necesarios."
    })
  }
  const response = await fetch(`http://localhost:8080/${URL_AUTH_API}/tickets`, {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
};
