import { createAlfrescoPerson } from "../api/alfresco/people/createPerson.js";
import { getAlfrescoPeople } from "../api/alfresco/people/getPeople.js";
import Person from "../models/Person.js";

export const getPeople = async (req, res) => {
  try {
    const ticket = req.ticket;
    const people = await getAlfrescoPeople(ticket);

    if (people) {

      const ourPeople = Person.find()
      return res.status(200).json({
        ok: true,
        msg: "people:",
        people,
        mongo:ourPeople
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: "No hay people",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la persona y crearla en Mongoose",
    });
  }
};

export const createPerson = async (req, res) => {
  try {
    const { id, firstName, lastName, email, password, skypeId, jobTitle } =
      req.body;
    const ticket = req.ticket;

    // Validar los datos de entrada
    if (!id || !firstName || !lastName || !email || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Los campos obligatorios son requeridos.",
      });
    }
    
    // Crear la persona en Alfresco
    const alfrescoPerson = await createAlfrescoPerson(ticket, {
      id,
      firstName,
      lastName,
      email,
      password,
      skypeId,
      jobTitle,
    });

    if (alfrescoPerson) {
      // Crear la persona en Mongoose utilizando los datos de Alfresco
      const newPerson = new Person({
        id,
        firstName,
        lastName,
        email,
        password,
        skypeId,
        jobTitle,
      });

      await newPerson.save(); // Guardar la persona en la base de datos de Mongoose

      return res.status(201).json({
        ok: true,
        msg: "Person creada en Alfresco y Mongoose:",
        alfrescoPerson,
        newPerson,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró la persona en Alfresco.",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      ok: false,
      msg: "Error al procesar la solicitud",
    });
  }
};
