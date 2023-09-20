import mongoose from 'mongoose'

const NodeSchema = new mongoose.Schema({
  createdByUser: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nodeType: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  properties: {
    type: Object,
    required: false
  },
  buffer: {
    type: Buffer,
    required: false
  }

},
{
  timestamps: true // Agrega campos createdAt y updatedAt automáticamente
})

const Node = mongoose.model('Node', NodeSchema)

export default Node
