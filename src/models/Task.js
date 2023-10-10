import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  expirationDate: {
    type: String,
    required: true
  },
  idProcess: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startedAt: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  assignee: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  }
},
{
  timestamps: true // Agrega campos createdAt y updatedAt automáticamente
})

const Task = mongoose.model('Task', TaskSchema)

export default Task
