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
  return new Promise((resolve, reject) => {
    tasks.push({ description, completed: false });
    resolve('Tarea añadida.');
  });
}

function completeTask(index) {
  return new Promise((resolve, reject) => {
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      resolve('Tarea completada.');
    } else {
      reject('Índice de tarea inválido.');
    }
  });
}

function deleteTask(index) {
  return new Promise((resolve, reject) => {
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      resolve('Tarea eliminada.');
    } else {
      reject('Índice de tarea inválido.');
    }
  });
}

async function handleInput(input) {
  switch (input) {
    case '1':
      showTasks();
      break;
    case '2':
      const description = await new Promise((resolve) => {
        rl.question('Descripción de la tarea: ', (description) => {
          resolve(description);
        });
      });
      try {
        const result = await addTask(description);
        console.log(result);
        showMenu();
      } catch (error) {
        console.error(error);
      }
      break;
    case '3':
      const completeIndex = await new Promise((resolve) => {
        rl.question('Índice de la tarea a completar: ', (index) => {
          resolve(parseInt(index) - 1);
        });
      });
      try {
        const result = await completeTask(completeIndex);
        console.log(result);
        showMenu();
      } catch (error) {
        console.error(error);
      }
      break;
    case '4':
      const deleteIndex = await new Promise((resolve) => {
        rl.question('Índice de la tarea a eliminar: ', (index) => {
          resolve(parseInt(index) - 1);
        });
      });
      try {
        const result = await deleteTask(deleteIndex);
        console.log(result);
        showMenu();
      } catch (error) {
        console.error(error);
      }
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('Opción inválida. Introduce una opción válida.');
      showMenu();
  }
}

function handleInputThen(input) {
  handleInput(input)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
}

showMenu();
rl.on('line', (input) => {
  handleInputThen(input);
});
