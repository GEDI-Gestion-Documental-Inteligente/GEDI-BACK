import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { createGroup, deleteGroup, getGroups } from './groups.service.js'

const router = Router()

// GET
router.get('/groups', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const sites = await getGroups({ ticket })
    return res.status(sites.status).json(sites)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/createGroup', validarJwt, async (req, res) => {
  try {
    const { id, displayName, parentIds } = req.body
    const ticket = req.ticket
    const site = await createGroup({
      ticket,
      groupData: {
        id, displayName, parentIds
      }
    })
    return res.status(site.status).json(site)
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

export default router
