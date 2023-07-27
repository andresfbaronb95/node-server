const http = require('http');

const tasks = [];

function addTask(description) {
  tasks.push({ description, completed: false });
  return 'Tarea añadida.';
}

function completeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    return 'Tarea completada.';
  } else {
    throw new Error('Índice de tarea inválido.');
  }
}

function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    return 'Tarea eliminada.';
  } else {
    throw new Error('Índice de tarea inválido.');
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/tasks' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Servidor escuchando en http://localhost:8000');
});

