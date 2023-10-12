import WorkFlow from '../../models/WorkFlow.js'
import Task from '../../models/Task.js'
import { addAlfrescoWorkFlowItems, createAlfrescoWorkFlow, getAlfrescoWorkFlowTasks } from './alfresco.workflow.service.js'
export const createWorkFlow = async ({ ticket, nodeData }) => {
  try {
    const { assignee, message, expirationDate, priority } = nodeData

    // validar que no llegen campos vacios

    const process = await createAlfrescoWorkFlow({ ticket, nodeData: { assignee, message, expirationDate, priority } })

    if (process.error) {
      return {
        ok: false,
        status: process.error.statusCode,
        msg: 'Hubo un error en alfresco',
        error: process.error.errorKey
      }
    }
    const idWorkFlow = process.entry.id
    const processTasks = await getAlfrescoWorkFlowTasks({ ticket, idWorkFlow })
    const tasks = processTasks.list.entries[0].entry
    console.log(tasks)
    const newWorkFlow = new WorkFlow({
      processDefinitionKey: process.entry.processDefinitionKey,
      startUserId: process.entry.startUserId,
      startedAt: process.entry.startedAt,
      idProcess: process.entry.id,
      completed: process.entry.completed,
      expirationDate,
      tasks
    })

    const mongoWorkFlow = await newWorkFlow.save()

    const newMongoTask = new Task({
      expirationDate: tasks.dueAt,
      idProcess: tasks.processId,
      name: 'Nueva Tarea',
      description: 'Nueva Tarea Iniciada por el usuario ' + process.entry.startUserId,
      startedAt: tasks.startedAt,
      id: tasks.id,
      assignee: tasks.assignee,
      state: tasks.state,
      priority: tasks.priority
    })

    const mongoTask = await newMongoTask.save()
    return {
      ok: true,
      status: 201,
      msg: 'WorkFlow creado correctamente',
      process,
      mongoWorkFlow,
      mongoTask
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
