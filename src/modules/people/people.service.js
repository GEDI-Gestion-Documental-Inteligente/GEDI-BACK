import {
  getAlfrescoPeople,
  createAlfrescoPerson,
  getAlfrescoPeopleActivities,
  getAlfrescoOnePerson,
  updateAlfrescoPerson,
  manageAlfrescoPersonStatus,
  createAlfrescoMemberRequest,
  deleteAlfrescoMemberRequest,
  updatePassAlfrescoPerson,
  getAlfrescoActivitiesOneSite
} from './alfresco.people.service.js'
import Person from '../../models/Person.js'

export const getPeople = async ({ ticket }) => {
  try {
    const people = await getAlfrescoPeople({ ticket })
    const mongoPeople = await Person.find()

    if (people.error) {
      return {
        ok: false,
        status: people.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: people.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'People:',
      people,
      mongoPeople
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Hubo un error en el servidor'
    }
  }
}

export const getOnePerson = async ({ ticket, idPerson }) => {
  try {
    const person = await getAlfrescoOnePerson({ ticket, idPerson })
    const mongoPerson = await Person.findOne({ id: idPerson })

    if (person.error) {
      return {
        ok: false,
        status: person.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: person.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'Person:',
      person,
      mongoPerson
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Hubo un error en el servidor'
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

    if (alfrescoPerson.error) {
      return {
        ok: false,
        status: alfrescoPerson.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: alfrescoPerson.error.errorKey
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

export const updatePerson = async ({ ticket, personData, idPerson }) => {
  try {
    const { firstName, lastName, email, skypeId, jobTitle } = personData

    // Validar los datos de entrada
    if (!firstName || !lastName || !email) {
      return {
        ok: false,
        status: 400,
        msg: 'Faltan campos requeridos'
      }
    }

    // Crear la persona en Alfresco
    const updatedAlfrescoPerson = await updateAlfrescoPerson({
      ticket,
      idPerson,
      personData: {
        firstName,
        lastName,
        email,
        skypeId,
        jobTitle
      }
    })

    if (updatedAlfrescoPerson.error) {
      return {
        ok: false,
        status: updatedAlfrescoPerson.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: updatedAlfrescoPerson.error.errorKey
      }
    }
    // SI ves este comentario significa que esto todavia no esta probado si anda
    const updatedMongoPerson = await Person.findOneAndUpdate(
      { id: idPerson },
      {
        $set: {
          ...updatedAlfrescoPerson.entry
        }
      },
      { new: true }
    )

    return {
      ok: true,
      status: 201,
      msg: 'Persona actualizada correctamente',
      updatedAlfrescoPerson,
      updatedMongoPerson
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

export const updatePassword = async ({ ticket, personData, idPerson }) => {
  try {
    const { oldPassword, password } = personData

    // Validar los datos de entrada
    if (!oldPassword || !password) {
      return {
        ok: false,
        status: 400,
        msg: 'Faltan campos requeridos'
      }
    }

    // Crear la persona en Alfresco
    const updatedPassword = await updatePassAlfrescoPerson({
      ticket,
      idPerson,
      personData: {
        oldPassword,
        password
      }
    })

    if (updatedPassword.error) {
      return {
        ok: false,
        status: updatedPassword.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: updatedPassword.error.errorKey
      }
    }
    // SI ves este comentario significa que esto todavia no esta probado si anda
    const updatedMongoPassword = await Person.findOneAndUpdate(
      { id: idPerson },
      {
        $set: {
          ...updatedPassword.entry,
          password
        }
      },
      { new: true }
    )

    return {
      ok: true,
      status: 201,
      msg: 'Contraseña actualizada correctamente',
      updatedPassword,
      updatedMongoPassword
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

export const managePersonStatus = async ({ ticket, idPerson, personData }) => {
  try {
    const { enabled } = personData
    const deletedPerson = await manageAlfrescoPersonStatus({
      ticket,
      idPerson,
      personData: {
        enabled
      }
    })
    const deletedMongoPerson = await Person.findOneAndDelete({ id: idPerson })

    if (deletedPerson.error) {
      return {
        ok: false,
        status: deletedPerson.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: deletedPerson.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'Estado cambiado correctamente',
      deletedPerson,
      deletedMongoPerson
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Hubo un error en el servidor'
    }
  }
}

export const createMemberRequest = async ({ ticket, requestData }) => {
  try {
    const { message, id, title } = requestData
    const memberRequest = await createAlfrescoMemberRequest({
      ticket,
      requestData: {
        message,
        id,
        title
      }
    })

    if (memberRequest.error) {
      return {
        ok: false,
        status: memberRequest.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: memberRequest.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'Solicitud realizada correctamente',
      memberRequest
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Hubo un error en el servidor'
    }
  }
}

export const deleteMemberRequest = async ({ ticket, siteId }) => {
  try {
    const deletedMemberRequest = await deleteAlfrescoMemberRequest({
      ticket,
      siteId
    })

    if (deletedMemberRequest.error) {
      return {
        ok: false,
        status: deletedMemberRequest.error.statusCode,
        msg: 'Hubo un error en Alfresco.',
        error: deletedMemberRequest.error.errorKey
      }
    }

    return {
      ok: true,
      status: 200,
      msg: 'Solicitud eliminada correctamente'
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ok: false,
      status: 500,
      msg: 'Hubo un error en el servidor'
    }
  }
}

export const getPeopleActivities = async ({ ticket, userId }) => {
  try {
    if (!userId) {
      return {
        ok: false,
        status: 400,
        msg: 'Faltan datos requeridos'
      }
    }

    const peopleActivities = await getAlfrescoPeopleActivities({
      ticket,
      userId
    })

    if (peopleActivities.error) {
      return {
        ok: false,
        status: peopleActivities.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: peopleActivities.error.errorKey
      }
    }

    return {
      ok: true,
      status: 201,
      peopleActivities
    }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      msg: 'Error al procesar la solicitud'
    }
  }
}

export const getActivitiesOneSite = async ({ ticket, siteId }) => {
  try {
    if (!siteId) {
      return {
        ok: false,
        status: 400,
        msg: 'Faltan datos requeridos'
      }
    }

    const siteActivities = await getAlfrescoActivitiesOneSite({
      ticket,
      siteId
    })

    if (siteActivities.error) {
      return {
        ok: false,
        status: siteActivities.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: siteActivities.error.errorKey
      }
    }

    return {
      ok: true,
      status: 201,
      siteActivities
    }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      msg: 'Error al procesar la solicitud'
    }
  }
}
