import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { addWorkFlowItem, createWorkFlow, getWorkFlowTasks } from './workflow.service.js'
const router = Router()
// POST

router.post('/create', validarJwt, async (req, res) => {
  try {
    const { assignee, message, expirationDate, priority, items } = req.body
    const ticket = req.ticket
    const workflow = await createWorkFlow({ nodeData: { assignee, message, expirationDate, priority, items }, ticket })
    const idWorkFlow = workflow.process.entry.id
    const addeditems = await addWorkFlowItem({ ticket, idWorkFlow, items })
    const tasks = await getWorkFlowTasks({ ticket, idWorkFlow })
    return res.status(workflow.status).json({ workflow, addeditems, tasks })
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

export default router
