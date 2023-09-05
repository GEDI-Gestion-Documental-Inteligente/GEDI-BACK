import { Router } from "express";
import { validarJwt } from "../../helpers/validar-jwt.js";
import { createPerson, getPeople } from "./people.service.js";
const router = Router();

router.post('/create', validarJwt, async (req, res) => {
    try {
        const { id, firstName, lastName, email, password, skypeId, jobTitle } = req.body;
        const ticket = req.ticket;
        const person = await createPerson({
            ticket, personData: {
                id, firstName, lastName, email, password, skypeId, jobTitle
            }
        })
        return res.status(person.status).json(person)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//GET
router.get('/all', validarJwt, async (req, res) => {
    try {
        const ticket = req.ticket;
        const people = await getPeople({ticket});
        return res.status(people.status).json(people)
    } catch (error) {
        return res.status(500).json(error)
    }
})
export default router;