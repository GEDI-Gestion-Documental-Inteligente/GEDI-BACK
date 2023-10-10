import mongoose from 'mongoose'

const WorkFlowSchema = new mongoose.Schema({
  processDefinitionKey: {
    type: String,
    required: true
  },
  startUserId: {
    type: String,
    required: true
  },
  startedAt: {
    type: String,
    required: true
  },
  idProcess: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  },
  tasks: {
    type: Object,
    required: true
  }
},
{
  timestamps: true // Agrega campos createdAt y updatedAt automáticamente
})

const WorkFlow = mongoose.model('WorkFlow', WorkFlowSchema)

export default WorkFlow
