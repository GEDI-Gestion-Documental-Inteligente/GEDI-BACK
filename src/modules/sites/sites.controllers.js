import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { createSite, createSiteMember, deleteSite, deleteSiteMember, getContainerDocumentLibrary, getMemberRequests, getMySites, getOneSite, getOneSiteMember, getSiteMembers, getSites, updateSite, updateSiteMember } from './sites.service.js'
const router = Router()

// GET
router.get('/all', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const sites = await getSites({ ticket })
    return res.status(sites.status).json(sites)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/one-site/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params.id
    const site = await getOneSite({ ticket, idSite })
    return res.status(site.status).json(site)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// POST
router.post('/create', validarJwt, async (req, res) => {
  try {
    const { id, title, description, visibility } = req.body
    const ticket = req.ticket
    const site = await createSite({
      ticket,
      siteData: {
        id, title, description, visibility
      }
    })
    return res.status(site.status).json(site)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// UPDATE
router.put('/update/:id', validarJwt, async (req, res) => {
  try {
    const idSite = req.params.id
    console.log(idSite)
    const { title, description, visibility } = req.body
    const ticket = req.ticket
    const updatedSite = await updateSite({
      ticket,
      idSite,
      siteData: {
        title, description, visibility
      }
    })
    return res.status(updatedSite.status).json(updatedSite)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// DELETE

router.delete('/delete/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params.id
    const deletedSite = await deleteSite({ ticket, idSite })
    return res.status(deletedSite.status).json(deletedSite)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// CRUD DE MIEMBROS DEL SITIO

// GET
router.get('/all-members/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params.id
    const siteMembers = await getSiteMembers({
      ticket,
      idSite
    })
    return res.status(siteMembers.status).json(siteMembers)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

router.get('/one-member/:id/:idPerson', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params.id
    const idPerson = req.params.idPerson
    const siteMember = await getOneSiteMember({
      ticket,
      idSite,
      idPerson
    })
    return res.status(siteMember.status).json(siteMember)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

// POST
router.post('/create-member/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params.id
    const { id, role } = req.body
    const siteMember = await createSiteMember({
      ticket,
      idSite,
      personData: {
        id, role
      }
    })
    return res.status(siteMember.status).json(siteMember)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

// UPDATE
router.put('/update-member/:id/:idPerson', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params.id
    const idPerson = req.params.idPerson

    const { role } = req.body
    const updatedSiteMember = await updateSiteMember({
      ticket,
      idSite,
      idPerson,
      personData: {
        role
      }
    })
    return res.status(updatedSiteMember.status).json(updatedSiteMember)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

// DELETE
router.delete('/delete-member/:id/:idPerson', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params.id
    const idPerson = req.params.idPerson

    const deletedSiteMember = await deleteSiteMember({
      ticket,
      idSite,
      idPerson
    })
    return res.status(deletedSiteMember.status).json(deletedSiteMember)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

// ENDPOINTS AUXILIARES
router.get('/document-library/:siteName', validarJwt, async (req, res) => {
  const siteName = req.params.siteName
  const ticket = req.ticket

  try {
    const containerDocumentLibrary = await getContainerDocumentLibrary({ ticket, siteName })
    return res.status(containerDocumentLibrary.status).json(containerDocumentLibrary)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

router.get('/my-sites', validarJwt, async (req, res) => {
  const ticket = req.ticket

  try {
    const mysites = await getMySites({ ticket })
    return res.status(mysites.status).json(mysites)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

router.get('/member-requests/:id', validarJwt, async (req, res) => {
  const ticket = req.ticket
  const idSite = req.params.id
  try {
    const requests = await getMemberRequests({ ticket, idSite })
    return res.status(requests.status).json(requests)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

export default router
