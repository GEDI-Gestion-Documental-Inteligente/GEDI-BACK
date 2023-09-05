import { Router } from "express";
import { createPerson, getPeople } from "../controllers/people.controllers.js";
import { validarJwt } from "../helpers/validar-jwt.js";


const router = Router();

router.get("/getPeople",validarJwt, getPeople );
router.post("/createPerson",validarJwt, createPerson );

export default router;
