import { toConvertBase64 } from '../../helpers/convert-base64.js'
// endpoint para manejar flujos de trabajo (testeando)

export const createAlfrescoWorkFlow = async ({ ticket, nodeData }) => {
  try {
    const URL_WORKFLOW_API = process.env.URL_WORKFLOW_API
    const URL_HOST = process.env.URL_HOST

    const token = toConvertBase64(ticket)
    console.log(token)

    const { assignee, message, expirationDate, priority } = nodeData

    const bodyData = {
      processDefinitionKey: 'activitiAdhoc',
      variables: {
        bpm_workflowDescription: message,
        bpm_assignee: assignee,
        bpm_workflowPriority: priority,
        bpm_workflowDueDate: expirationDate
      }
    }
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
    console.log(error)
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
