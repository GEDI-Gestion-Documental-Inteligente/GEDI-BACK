import { Router } from 'express'
import { authLogin } from './auth.service.js'
import { apiLimiter } from '../../middlewares/apiLimiter.js'
const router = Router()

router.post('/auth', apiLimiter, async (req, res) => {
  try {
    const { userId, password } = req.body
    const loginAlfresco = await authLogin({ userId, password })

    if (!loginAlfresco.ok) {
      return res.status(loginAlfresco.status).json(loginAlfresco)
    }
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
