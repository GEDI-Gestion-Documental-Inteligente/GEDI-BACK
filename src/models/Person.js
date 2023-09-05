import mongoose from "mongoose"

const personSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    skypeId: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
  }
);

const Person = mongoose.model("Person", personSchema);

export default Person
