import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { /* createNodes, */ getNodeContent, getNodeInfo, getNodes } from './nodes.service.js'
const router = Router()

// GET
router.get('/all', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const sites = await getNodes({ ticket })
    return res.status(sites.status).json(sites)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/content/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idNode = req.params.id
    const content = await getNodeContent({ ticket, idNode })
    return res.status(content.status).json(content)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/info/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket

    const idNode = req.params.id
    const node = await getNodeInfo({ ticket, idNode })
    return res.status(node.status).json(node)
  } catch (error) {
    return res.status(500).json(error)
  }
})
// POST
/* router.post('/create', validarJwt, async (req, res) => {
  try {
    const { id, title, description, visibility } = req.body
    const ticket = req.ticket
    const person = await createNodes({
      ticket,
      siteData: {
        id,
        title,
        description,
        visibility
      }
    })
    return res.status(person.status).json(person)
  } catch (error) {
    return res.status(500).json(error)
  }
}) */

export default router
