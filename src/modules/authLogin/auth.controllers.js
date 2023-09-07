import { Router } from 'express'
import { authLogin } from './auth.service.js'
const router = Router()

router.post('/auth', async (req, res) => {
  try {
    const { userId, password } = req.body
    const loginAlfresco = await authLogin({ userId, password })

    if (!loginAlfresco.ok) {
      return res.json(loginAlfresco)
    }

    req.cookies.token_ticket = loginAlfresco.token
    return res.status(loginAlfresco.status).json(loginAlfresco)
  } catch (error) {
    console.error('Error:', error.message)
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió algo con el servidor'
    })
  }
})

export default router
