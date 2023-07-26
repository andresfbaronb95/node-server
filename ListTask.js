const readline = require('readline');

const tasks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('===== Lista de Tareas =====');
  console.log('1. Ver tareas');
  console.log('2. Añadir tarea');
  console.log('3. Completar tarea');
  console.log('4. Eliminar tarea');
  console.log('0. Salir');
}

function showTasks() {
  console.log('===== Tareas =====');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.description}`);
  });
}

function addTask(description) {
  tasks.push({ description, completed: false });
  console.log('Tarea añadida.');
}

function completeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    console.log('Tarea completada.');
  } else {
    console.log('Índice de tarea inválido.');
  }
}

function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    console.log('Tarea eliminada.');
  } else {
    console.log('Índice de tarea inválido.');
  }
}

function handleInput(input) {
  switch (input) {
    case '1':
      showTasks();
      break;
    case '2':
      rl.question('Descripción de la tarea: ', (description) => {
        addTask(description);
        showMenu();
      });
      break;
    case '3':
      rl.question('Índice de la tarea a completar: ', (index) => {
        completeTask(parseInt(index) - 1);
        showMenu();
      });
      break;
    case '4':
      rl.question('Índice de la tarea a eliminar: ', (index) => {
        deleteTask(parseInt(index) - 1);
        showMenu();
      });
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('Opción inválida. Introduce una opción válida.');
      showMenu();
  }
}

showMenu();
rl.on('line', (input) => {
  handleInput(input);
});
