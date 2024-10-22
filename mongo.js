const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://48212:${password}@cluster0.7kuuk.mongodb.net/noteApp?
  retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'The idea behind Mongoose is that the data store',
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
//   mongoose.connection.close()
})

Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(`${note.content}` )
  })
  mongoose.connection.close()
})