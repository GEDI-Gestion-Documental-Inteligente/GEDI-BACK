import { Router } from "express";
import { authLogin } from "./authLogin.service.js";
const router = Router();

router.post("/auth", async (req, res) => {
    try {
        const { userId, password } = req.body;
        const loginAlfresco = await authLogin({ userId, password });

        if (!loginAlfresco.ok) {
            return res.json(loginAlfresco)
        }

        req.cookies['token_ticket'] = loginAlfresco.token;
        return res.json({
            ok: true,
            msg: "Usuario logueado correctamente.",
            token: loginAlfresco.token,

        })
    } catch (error) {
        console.error("Error:", error.msg);
        return res.status(500).json({
            ok: false,
            msg: "Ocurrió algo con el servidor"
        });
    }
});

export default router;
