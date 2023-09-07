import { getAlfrescoPeople, createAlfrescoPerson, getAlfrescoPeopleActivities } from './alfresco.people.service.js'
import Person from '../../models/Person.js'

export const getPeople = async ({ ticket }) => {
  try {
    const people = await getAlfrescoPeople({ ticket })

    if (!people) {
      return {
        ok: false,
        status: 404,
        msg: 'No hay people'
      }
    }

    const ourPeople = Person.find()
    return {
      ok: true,
      status: 200,
      msg: 'people:',
      people,
      mongo: ourPeople
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Error al obtener la persona y crearla en Mongoose'
    }
  }
}

export const createPerson = async ({ ticket, personData }) => {
  try {
    const { id, firstName, lastName, email, password, skypeId, jobTitle } =
            personData

    // Validar los datos de entrada
    if (!id || !firstName || !lastName || !email || !password) {
      return {
        ok: false,
        status: 400,
        msg: 'Los campos obligatorios son requeridos.'
      }
    }

    // Crear la persona en Alfresco
    const alfrescoPerson = await createAlfrescoPerson({
      ticket,
      personData: {
        id,
        firstName,
        lastName,
        email,
        password,
        skypeId,
        jobTitle
      }
    })

    if (!alfrescoPerson) {
      return {
        ok: false,
        status: 404,
        msg: 'No se encontró la persona en Alfresco.'
      }
    }
    // Crear la persona en Mongoose utilizando los datos de Alfresco
    const newPerson = new Person({ ...alfrescoPerson.entry, password })

    await newPerson.save() // Guardar la persona en la base de datos de Mongoose

    return {
      ok: true,
      status: 201,
      msg: 'Person creada en Alfresco y Mongoose:',
      alfrescoPerson,
      newPerson
    }
  } catch (error) {
    console.error('Error:', error.message)
    return {
      ok: false,
      status: 500,
      msg: 'Error al procesar la solicitud'
    }
  }
}

export const getPeopleActivities = async ({ ticket, userId }) => {
  try {
    if (!userId) {
      return ({
        ok: false,
        status: 400,
        msg: 'Faltan datos requeridos'
      })
    }

    const peopleActivities = await getAlfrescoPeopleActivities({ ticket, userId })

    if (!peopleActivities) {
      return ({
        ok: false,
        status: 404,
        msg: 'No se han encontrado registros'
      })
    }

    return ({
      ok: true,
      status: 201,
      peopleActivities
    })
  } catch (error) {
    return ({
      ok: false,
      status: 500,
      msg: 'Error al procesar la solicitud'
    })
  }
}
