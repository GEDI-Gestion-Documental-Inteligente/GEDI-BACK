import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { sendQueriesForNodes, sendQueriesForPeople, sendQueriesForSites, sendQueriesWithTerm } from './queries.services.js'

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

router.get('/searchNodes', validarJwt, async (req, res) => {
  const ticket = req.ticket
  const { term } = req.query
  const { root } = req.query

  try {
    const resultQuery = await sendQueriesForNodes({ ticket, term, root })
    return res.status(resultQuery.status).json(resultQuery)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/searchSites', validarJwt, async (req, res) => {
  const ticket = req.ticket
  const term = req.query

  try {
    const resultQuery = await sendQueriesForSites({ ticket, term })
    return res.status(resultQuery.status).json(resultQuery)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/searchPeople', validarJwt, async (req, res) => {
  const ticket = req.ticket
  const { term } = req.query

  try {
    const resultQuery = await sendQueriesForPeople({ ticket, term })
    return res.status(resultQuery.status).json(resultQuery)
  } catch (error) {
    return res.status(500).json(error)
  }
})
export default router
