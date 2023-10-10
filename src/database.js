import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const url = process.env.URL_MONGODB
    const conn = await mongoose.connect(url)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
