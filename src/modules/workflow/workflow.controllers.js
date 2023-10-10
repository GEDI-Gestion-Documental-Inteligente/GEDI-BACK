import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { addWorkFlowItem, createWorkFlow } from './workflow.service.js'
const router = Router()
// POST

router.post('/create', validarJwt, async (req, res) => {
  try {
    const { assignee, description, expirationDate, priority, items } = req.body
    console.log(req.body)
    const ticket = req.ticket
    const workflow = await createWorkFlow({ nodeData: { assignee, description, expirationDate, priority, items }, ticket })
    const idWorkFlow = workflow.process.entry.id
    const addeditems = await addWorkFlowItem({ ticket, idWorkFlow, items })
    return res.status(workflow.status).json({ workflow, addeditems })
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

export default router
