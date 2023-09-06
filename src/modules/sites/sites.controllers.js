import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { createSite, deleteSite, getSites } from './sites.service.js'
const router = Router()

// GET
router.get('/all', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const sites = await getSites({ ticket })
    return res.status(sites.status).json(sites)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/create', validarJwt, async (req, res) => {
  try {
    const { id, title, description, visibility } = req.body
    const ticket = req.ticket
    const site = await createSite({
      ticket,
      siteData: {
        id, title, description, visibility
      }
    })
    return res.status(site.status).json(site)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// DELETE

router.delete('delete', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params
    const deletedSite = await deleteSite({ ticket, idSite })
    return res.status(deletedSite.status).json(deletedSite)
  } catch (error) {
    return res.status(500).json(error)
  }
})

export default router
