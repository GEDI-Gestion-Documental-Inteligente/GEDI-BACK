import { Router } from 'express'
import { validarJwt } from '../../helpers/validar-jwt.js'
import { createSite, createSiteGroupMember, createSiteMember, deleteSite, getContainerDocumentLibrary, getMySites, getSites } from './sites.service.js'
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

// DELETE

router.delete('/delete', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params
    const deletedSite = await deleteSite({ ticket, idSite })
    return res.status(deletedSite.status).json(deletedSite)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// el id corresponde al sitio donde sera agregada la persona y se le da un rol en el mismo
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

// el id del body corresponde al id del grupo
router.post('/create-group-member/:id', validarJwt, async (req, res) => {
  try {
    const ticket = req.ticket
    const idSite = req.params.id
    console.log(idSite)
    const groupData = req.body
    const siteGroupMember = await createSiteGroupMember({
      ticket,
      idSite,
      groupData
    })
    return res.json(siteGroupMember)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

router.get('/getContainerSite/:siteName', validarJwt, async (req, res) => {
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

router.get('/getMySites', validarJwt, async (req, res) => {
  const ticket = req.ticket

  try {
    const mysites = await getMySites({ ticket })
    return res.status(mysites.status).json(mysites)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})

export default router
