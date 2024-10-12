const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json()); // Middleware для парсинга JSON

// Кастомный токен для логирования содержимого body.content
morgan.token('body-content', (req) => {
  console.log('Body content:', req.body.content); // Для отладки
  return req.body.content ? req.body.content : 'нет контента';
});

// Используем кастомный токен в формате 'common'
app.use(morgan(':method :url :status :res[content-length] - :response-time ms -  {:body-content}'));

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

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const body = req.body;

  console.log('Received POST request body:', body); // Дополнительный вывод

  if (!body.content) {
    return res.status(400).json({
      error: 'content is missing'
    });
  }

  const newNote = {
    id: (notes.length + 1).toString(),
    content: body.content,
    important: body.important || false,
  };

  notes.push(newNote);
  res.json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
