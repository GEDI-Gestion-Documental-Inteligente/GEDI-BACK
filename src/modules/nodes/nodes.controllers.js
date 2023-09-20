import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { createFolder, getNodeContent, getNodeInfo, getNodes, uploadContent } from './nodes.service.js'
const router = Router()

// GET
router.get('/:idNode', validarJwt, async (req, res) => {
  try {
    // obtiene la información de un nodo
    const ticket = req.ticket
    const idNode = req.params.idNode
    const node = await getNodeInfo({ ticket, idNode })
    return res.status(node.status).json(node)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/:idNode/childrens', validarJwt, async (req, res) => {
  try {
    // obtiene la información de los hijos del nodo
    const ticket = req.ticket
    const idNode = req.params.idNode
    const sites = await getNodes({ ticket, idNode })
    return res.status(sites.status).json(sites)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/:idNode/content', validarJwt, async (req, res) => {
  try {
    // obtiene el contenido del nodo => sirve para archivos por ejemplo: pdf
    const ticket = req.ticket
    const idNode = req.params.idNode
    const content = await getNodeContent({ ticket, idNode })
    return res.status(content.status).json(content)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/:idParent/create', validarJwt, async (req, res) => {
  try {
  // crea un nodo a partir de un nombre del nodo y su tipo [folder,content]
  // tambien puede recibir como caracteristica interna un title y description
    const { name, title, description } = req.body
    const ticket = req.ticket
    const idNode = req.params.idParent
    const person = await createFolder({
      ticket,
      idNode,
      nodeData: {
        name,
        title,
        description
      }
    })
    return res.status(person.status).json(person)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/:idParent/uploadContent', validarJwt, async (req, res) => {
  try {
    const file = req.file
    const { /* name,  *//* nodeType,  */title, description } = req.body
    const ticket = req.ticket
    const idNode = req.params.idParent
    const content = await uploadContent({
      ticket,
      idNode,
      file,
      nodeData: {
        /* name, */
        title,
        /*  nodeType, */
        description
      }
    })
    return res.status(content.status).json(content)
  } catch (error) {
    return res.status(500).json(error)
  }
})

export default router
