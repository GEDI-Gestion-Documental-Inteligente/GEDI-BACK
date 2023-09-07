import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { /* createNodes, */ createNodes, getNodeContent, getNodeInfo, getNodes } from './nodes.service.js'
const router = Router()

// GET
router.get('/:idNode/childrens', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idNode = req.params.idNode
    const sites = await getNodes({ ticket, idNode })
    return res.status(sites.status).json(sites)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/:idNode', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket

    const idNode = req.params.idNode
    const node = await getNodeInfo({ ticket, idNode })
    return res.status(node.status).json(node)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/content/:idNode', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idNode = req.params.idNode
    const content = await getNodeContent({ ticket, idNode })
    return res.status(content.status).json(content)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/create/:idParent', validarJwt, async (req, res) => {
  try {
    const { name, nodeType, title, description } = req.body
    const ticket = req.ticket
    const idNode = req.params.idParent
    const person = await createNodes({
      ticket,
      idNode,
      nodeData: {
        name,
        title,
        nodeType,
        description
      }
    })
    return res.status(person.status).json(person)
  } catch (error) {
    return res.status(500).json(error)
  }
})

export default router
