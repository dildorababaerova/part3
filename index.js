const express = require('express');
const app = express();
// const morgan = require('morgan');
const cors = require('cors')

app.use(express.json()); 
const corsOptions = {
origin: 'http://localhost:5173',
}

app.use(cors(corsOptions))
app.use(express.static('dist'))

// morgan.token('body-content', (request) => {
//   console.log('Body content:', request.body.content); 
//   return request.body.content ? request.body.content : 'нет контента';
// });


// app.use(morgan(':method :url :status :res[content-length] - :response-time ms - body-content: :body-content'));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

app.get('/', (request, response) => {
  response.send('<h1> Hello World! </h1>');   
});

app.get('/api/notes', (request, response) => {
  response.json(notes);   
});

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === id);
  response.json(note);   
});

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0;
  return (maxId + 1).toString();
};


app.post('/api/notes', (request, response) => {
  const body = request.body;

  console.log('Received POST request body:', body); // Дополнительный вывод

  if (!body.content) {
    return response.status(400).json({
      error: 'content is missing'
    });
  }

  const newNote = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false,
  };

  notes=notes.concat(newNote);
  response.json(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
