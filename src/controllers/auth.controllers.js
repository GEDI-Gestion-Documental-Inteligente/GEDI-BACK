import { getAlfrescoTicket } from "../api/alfresco/auth/login.js";
import { generarJwt } from "../helpers/generar-jwt.js";

export const authLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Faltan datos",
        param: !userId ? "userId" : "password",
      });
    }

    const auth = await getAlfrescoTicket({ userId, password });

    if (auth.entry.id) {
      const token = await generarJwt(auth.entry.id, process.env.SECRET);
      req.cookies["token_ticket"] = token;

      return res.status(200).json({
        ok: true,
        msg: "Autenticación correcta - REVISAR COOKIES",
        cookiesDelServidor: req.cookies,
      });
    } else {
      return res.status(401).json({
        ok: false,
        msg: "Autenticación fallida",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      ok: false,
      msg: "Error al procesar la solicitud",
    });
  }
};
