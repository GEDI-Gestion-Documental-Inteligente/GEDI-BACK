import { toConvertBase64 } from '../../helpers/convert-base64.js'
// endpoint para manejar flujos de trabajo (testeando)

export const createAlfrescoWorkFlow = async ({ ticket, nodeData }) => {
  try {
    const URL_WORKFLOW_API = process.env.URL_WORKFLOW_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    console.log({ token })
    const bodyData = {
      processDefinitionKey: 'activitiAdhoc',
      variables: {}
    }
    Object.keys(nodeData).forEach((prop, index) => {
      // console.log({ prop, index, valor: nodeData[prop] })
      if (!nodeData?.[prop]) {
        return
      }
      switch (prop) {
        case 'message':
          bodyData.variables.bpm_workflowDescription = nodeData[prop]
          break
        case 'assignee':
          bodyData.variables.bpm_assignee = nodeData[prop]
          break
        case 'priority':
          bodyData.variables.bpm_workflowPriority = nodeData[prop]
          break
        case 'expirationDate':
          bodyData.variables.bpm_workflowDueDate = nodeData[prop]
          break
        case 'emailNotif':
          bodyData.variables.bpm_sendEMailNotifications = nodeData[prop] === 'true'
      }
    })
    if (!Object.keys(bodyData?.variables).length) {
      return {
        ok: false,
        status: 401,
        msg: 'No está mandando bien los datos de la tarea',
        datosAceptables: {
          message: 'string',
          assignee: 'nombreUsuario',
          priority: 'number: de alta prioridad 1,2 o 3 a baja',
          expirationDate: 'yyyy-mm-dd',
          emailNotif: 'BooleanString'
        }
      }
    }
    /*
      ejemplo
      {
        prop_bpm_workflowDescription: "fijate esta presentacion",
        prop_bpm_workflowDueDate: "2023-10-01",
        prop_bpm_workflowPriority: "1",
        assoc_bpm_assignee_added: "workspace://SpacesStore/3c585292-a022-4c9e-8607-c76abed13cd4",
        assoc_bpm_assignee_removed:"" ,
        assoc_packageItems_added: "workspace://SpacesStore/99cb2789-f67e-41ff-bea9-505c138a6b23",
        assoc_packageItems_removed: "" ,
        prop_bpm_sendEMailNotifications: "false"
      }
    */
    const response = await fetch(`http://${URL_HOST}:8080/${URL_WORKFLOW_API}/processes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}

// get
export const getAlfrescoWorkFlowTasks = async ({ ticket, idWorkFlow }) => {
  try {
    const URL_WORKFLOW_API = process.env.URL_WORKFLOW_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)

    const response = await fetch(`http://${URL_HOST}:8080/${URL_WORKFLOW_API}/processes/${idWorkFlow}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// get
export const addAlfrescoWorkFlowItems = async ({ ticket, idWorkFlow, items }) => {
  try {
    const URL_WORKFLOW_API = process.env.URL_WORKFLOW_API
    const URL_HOST = process.env.URL_HOST
    const token = toConvertBase64(ticket)
    const bodyData = items.map(id => ({ id }))

    console.log(bodyData)

    const response = await fetch(`http://${URL_HOST}:8080/${URL_WORKFLOW_API}/processes/${idWorkFlow}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// get
export const getAlfrescoWorkFlowItems = async ({ ticket, idWorkFlow }) => {
  try {
    const URL_WORKFLOW_API = process.env.URL_WORKFLOW_API
    const URL_HOST = process.env.URL_HOST
    const token = toConvertBase64(ticket)

    const response = await fetch(`http://${URL_HOST}:8080/${URL_WORKFLOW_API}/processes/${idWorkFlow}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
