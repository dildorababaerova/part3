require('dotenv').config();
const mongoose = require('mongoose')
const Note = require('./models/note')
const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json()); 
app.use(cors())
app.use(express.static('dist'))



app.get('/', (request, response) => {
  response.send('<h1> Hello World! </h1>');   
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes=> {
    response.json(notes);
  })
    .catch(err => {
      response.status(500).json({ error: 'Failed to retrieve notes' });   
  })
});

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note=>{
    response.json(note);   
  })
});

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end(); // Успешное удаление
      } else {
        response.status(404).json({ error: 'Note not found' }); // Запись не найдена
      }
    })
    .catch(error => {
      console.error('Error deleting note:', error.message);
      response.status(500).json({ error: 'Server error' }); // Ошибка сервера
    });
});


  
  app.post('/api/notes', (request, response) => {
    const body = request.body;
    
    console.log('Received POST request body:', body); // Дополнительный вывод
    
    if (!body.content) {
      return response.status(400).json({
        error: 'content is missing'
      });
    }
    
    const note = new Note({
      content: body.content,
      important: body.important || false,
    });
    
    note.save().then(savedNote =>{
      response.json(savedNote);
    });
  })
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });




  // const morgan = require('morgan');
  // morgan.token('body-content', (request) => {
  //   console.log('Body content:', request.body.content); 
  //   return request.body.content ? request.body.content : 'нет контента';
  // });
  
  
  // app.use(morgan(':method :url :status :res[content-length] - :response-time ms - body-content: :body-content'));


  // const generateId = () => {
  //   const maxId = notes.length > 0
  //     ? Math.max(...notes.map(n => Number(n.id)))
  //     : 0;
  //   return (maxId + 1).toString();
  // };
  