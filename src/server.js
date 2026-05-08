const express = require('express');

const app = express();
app.use(express.json());

// In-memory "database" — fine for the demo, obviously not for prod.
const todos = [];
let nextId = 1;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/todos', (_req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  // BUG (intentional, for the PR-reviewer demo): no validation on body.title
  const todo = { id: nextId++, title: req.body.title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete('/todos/:id', (req, res) => {
  // BUG (intentional): parseInt without radix, no 404 when missing
  const id = parseInt(req.params.id);
  const idx = todos.findIndex((t) => t.id === id);
  todos.splice(idx, 1);
  res.status(204).end();
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on ${port}`));
}

module.exports = app;
