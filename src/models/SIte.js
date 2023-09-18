import mongoose from 'mongoose'

const SiteSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  guid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    required: true
  }
},
{
  timestamps: true // Agrega campos createdAt y updatedAt automáticamente
})

const Site = mongoose.model('Site', SiteSchema)

export default Site
