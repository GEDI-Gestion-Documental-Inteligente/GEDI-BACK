import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { createMemberRequest, createPerson, deleteMemberRequest, getOnePerson, getPeople, getPeopleActivities, managePersonStatus, updatePerson } from './people.service.js'
const router = Router()
// GET
router.get('/all-people', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const people = await getPeople({ ticket })
    return res.status(people.status).json(people)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

router.get('/one-person/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idPerson = req.params.id
    const person = await getOnePerson({ ticket, idPerson })
    return res.status(person.status).json(person)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

router.post('/create', validarJwt, async (req, res) => {
  try {
    const { id, firstName, lastName, email, password, skypeId, jobTitle } = req.body
    const ticket = req.ticket
    const person = await createPerson({
      ticket,
      personData: {
        id, firstName, lastName, email, password, skypeId, jobTitle
      }
    })
    return res.status(person.status).json(person)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.put('/update/:id', validarJwt, async (req, res) => {
  try {
    const { firstName, lastName, email, skypeId, jobTitle } = req.body
    const ticket = req.ticket
    const idPerson = req.params.id
    const updatedPerson = await updatePerson({
      ticket,
      idPerson,
      personData: {
        firstName, lastName, email, skypeId, jobTitle
      }
    })
    return res.status(updatedPerson.status).json(updatedPerson)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.put('/manage-status/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idPerson = req.params.id
    const { enabled } = req.body
    const deletedPerson = await managePersonStatus({
      ticket,
      idPerson,
      personData: {
        enabled
      }
    })
    return res.status(deletedPerson.status).json(deletedPerson)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post('/create-member-request', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const { message, id, title } = req.body
    const memberRequest = await createMemberRequest({
      ticket,
      requestData: {
        message,
        id,
        title
      }
    })
    return res.status(memberRequest.status).json(memberRequest)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete('/delete-member-request/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const siteId = req.params.id
    const deletedMemberRequest = await deleteMemberRequest({
      ticket,
      siteId
    })
    return res.status(deletedMemberRequest.status).json(deletedMemberRequest)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/all-activities', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const userId = req.userId

    const activities = await getPeopleActivities({ ticket, userId })
    return res.status(activities.status).json(activities)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})
export default router
