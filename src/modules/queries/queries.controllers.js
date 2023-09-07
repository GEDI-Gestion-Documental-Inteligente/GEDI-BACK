import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { sendQueriesForNodes, sendQueriesWithTerm } from './queries.services.js'

const router = Router()

router.post('/searchWithTerm', validarJwt, async (req, res) => {
  const ticket = req.ticket
  const term = req.body

  try {
    const resultQuery = await sendQueriesWithTerm({ ticket, term })
    return res.status(resultQuery.status).json(resultQuery)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post('/searchNodes', validarJwt, async (req, res) => {
  const ticket = req.ticket
  const term = req.query.params

  try {
    const resultQuery = await sendQueriesForNodes({ ticket, term })
    return res.status(resultQuery.status).json(resultQuery)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post('/searchSites', validarJwt, async (req, res) => {
  const ticket = req.ticket
  const term = req.query.params

  try {
    const resultQuery = await sendQueriesForNodes({ ticket, term })
    return res.status(resultQuery.status).json(resultQuery)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post('/searchPeople', validarJwt, async (req, res) => {
  const ticket = req.ticket
  const term = req.query.params

  try {
    const resultQuery = await sendQueriesForNodes({ ticket, term })
    return res.status(resultQuery.status).json(resultQuery)
  } catch (error) {
    return res.status(500).json(error)
  }
})
export default router
