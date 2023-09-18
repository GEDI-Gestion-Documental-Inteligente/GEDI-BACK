import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { createGroup, createGroupMember, deleteGroup, getGroups } from './groups.service.js'

const router = Router()

// GET
router.get('/groups', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const groups = await getGroups({ ticket })
    return res.status(groups.status).json(groups)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/createGroup', validarJwt, async (req, res) => {
  try {
    const { id, displayName, parentIds } = req.body
    const ticket = req.ticket
    const group = await createGroup({
      ticket,
      groupData: {
        id, displayName, parentIds
      }
    })
    return res.status(group.status).json(group)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// DELETE

router.delete('/deleteGroup', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idGroup = req.query.id
    console.log(idGroup)
    const deletedGroup = await deleteGroup({ ticket, idGroup })
    return res.status(deletedGroup.status).json(deletedGroup)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post('/:idGroup/createMember', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idGroup = req.params.idGroup
    const idMember = req.body.id
    const createdMember = await createGroupMember({ ticket, idGroup, idMember })
    return res.status(createdMember.status).json(createdMember)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

export default router
