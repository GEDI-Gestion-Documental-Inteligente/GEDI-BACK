import { addAlfrescoWorkFlowItems, createAlfrescoWorkFlow, getAlfrescoWorkFlowTasks } from './alfresco.workflow.service.js'
export const createWorkFlow = async ({ ticket, nodeData }) => {
  try {
    const { assignee, description, expirationDate, priority } = nodeData

    // validar que no llegen campos vacios

    const process = await createAlfrescoWorkFlow({ ticket, nodeData: { assignee, description, expirationDate, priority } })
    if (process.error) {
      return {
        ok: false,
        status: process.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: process.error.errorKey,
        xd: process.error
      }
    }
    return {
      ok: true,
      status: 201,
      msg: 'WorkFlow creado correctamente',
      process
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

export const getWorkFlowTasks = async ({ ticket, idWorkFlow }) => {
  try {
    const tasks = await getAlfrescoWorkFlowTasks({ ticket, idWorkFlow })
    if (tasks.error) {
      return {
        ok: false,
        status: tasks.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: tasks.error.errorKey
      }
    }
    return {
      ok: true,
      status: 201,
      msg: 'Tareas del workflow:',
      tasks
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

export const addWorkFlowItem = async ({ ticket, idWorkFlow, items }) => {
  try {
    const addeditems = await addAlfrescoWorkFlowItems({ ticket, idWorkFlow, items })
    if (addeditems.error) {
      return {
        ok: false,
        status: addeditems.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: addeditems.error.errorKey
      }
    }
    return {
      ok: true,
      status: 201,
      msg: 'Items agregados al workflow:',
      addeditems
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
