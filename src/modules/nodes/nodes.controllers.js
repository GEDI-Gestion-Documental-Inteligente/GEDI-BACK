import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import {
  createFolder,
  deleteNode,
  getNodeContent,
  getNodeInfo,
  getNodeParents,
  getNodeTypes,
  getNodes,
  moveNode,
  revertPermissionsNode,
  updateNode,
  updatePermissionsNode,
  updateTypeNode,
  uploadContent,
} from './nodes.service.js'
const router = Router()
// GET
router.get('/one-node/:idNode', validarJwt, async(req, res) => {
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

// POST
router.post('/:idParent/create-folder', validarJwt, async(req, res) => {
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
        description,
      },
    })
    return res.status(person.status).json(person)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/:idParent/upload-content', validarJwt, async(req, res) => {
  try {
    const file = req.file
    const { name, title, description, typeDocument } = req.body
    const ticket = req.ticket
    const idNode = req.params.idParent
    const content = await uploadContent({
      ticket,
      idNode,
      file,
      nodeData: {
        name,
        title,
        description,
        typeDocument,
      },
    })
    return res.status(content.status).json(content)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// PUT
router.put('/update/:id', validarJwt, async(req, res) => {
  try {
    const { name, title, description } = req.body
    const ticket = req.ticket
    const idNode = req.params.id
    const updatedNode = await updateNode({
      ticket,
      idNode,
      nodeData: {
        name,
        title,
        description,
      },
    })
    return res.status(updatedNode.status).json(updatedNode)
  } catch (error) {
    return res.status(500).json(error)
  }
})
// DELETE

router.delete('/delete/:id', validarJwt, async(req, res) => {
  try {
    const ticket = req.ticket
    const idNode = req.params.id
    const deletedNode = await deleteNode({ ticket, idNode })
    return res.status(deletedNode.status).json(deletedNode)
  } catch (error) {
    return res.status(500).json(error)
  }
})
// SERVICIOS ADICIONALES AL CRUD

router.get('/:idNode/childrens', validarJwt, async(req, res) => {
  try {
    // obtiene la información de los hijos del nodo
    const ticket = req.ticket
    const idNode = req.params.idNode
    const nodes = await getNodes({ ticket, idNode })
    return res.status(nodes.status).json(nodes)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/:idNode/parents', validarJwt, async(req, res) => {
  try {
    // obtiene la información de los hijos del nodo
    const ticket = req.ticket
    const idNode = req.params.idNode
    const parentNodes = await getNodeParents({ ticket, idNode })
    return res.status(parentNodes.status).json(parentNodes)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/:idNode/content', validarJwt, async(req, res) => {
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

// PUT
router.put('/update-permissions/:id', validarJwt, async(req, res) => {
  try {
    const { authorityId, name, accessStatus } = req.body
    const ticket = req.ticket
    const idNode = req.params.id
    const updatedPermissions = await updatePermissionsNode({
      ticket,
      idNode,
      nodeData: {
        authorityId,
        name,
        accessStatus,
      },
    })
    return res.status(updatedPermissions.status).json(updatedPermissions)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.put('/revert-permissions/:id', validarJwt, async(req, res) => {
  try {
    const { authorityId, name, accessStatus } = req.body
    const ticket = req.ticket
    const idNode = req.params.id
    const updatedPermissions = await revertPermissionsNode({
      ticket,
      idNode,
      nodeData: {
        authorityId,
        name,
        accessStatus,
      },
    })
    return res.status(updatedPermissions.status).json(updatedPermissions)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// PUT
router.put('/update-type/:id', validarJwt, async(req, res) => {
  try {
    const { typeDocument } = req.body
    const ticket = req.ticket
    const idNode = req.params.id
    const updatedTypeNode = await updateTypeNode({
      ticket,
      idNode,
      nodeData: {
        typeDocument,
      },
    })
    return res.status(updatedTypeNode.status).json(updatedTypeNode)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/move-node/:id', validarJwt, async(req, res) => {
  try {
    const { targetId } = req.body
    const ticket = req.ticket
    const idNode = req.params.id
    const nodeMoved = await moveNode({
      ticket,
      idNode,
      targetId,
    })
    return res.status(nodeMoved.status).json(nodeMoved)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/types', validarJwt, async(req, res) => {
  try {
    // obtiene la información de un nodo
    const ticket = req.ticket

    const types = await getNodeTypes({ ticket })
    return res.status(types.status).json(types)
  } catch (error) {
    return res.status(500).json(error)
  }
})
export default router
