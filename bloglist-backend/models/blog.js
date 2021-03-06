const mongoose = require('mongoose')
const uniqueArrayValidator = require('mongoose-unique-array')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: String, minlength: 3, unique: true }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

blogSchema.plugin(uniqueArrayValidator)

module.exports = mongoose.model('Blog', blogSchema)
