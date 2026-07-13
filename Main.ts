import readline from "readline-sync";
import fs from "fs";

const getTodos = (a: string[]) => {
  return a.reduce((index, e) => index + e);
};

interface IDataTodos {
  getDate(): void;
}

class Dates implements IDataTodos {
  getDate(): void {
    const tDate = Temporal.Now.plainDateTimeISO().toPlainTime();
    console.log(`${tDate.hour}:${tDate.minute}:${tDate.second.toFixed(2)}`);
  }
}

const date = new Dates();
date.getDate();

function main() {
  const todos: string[] = [];
  const todo_1 = readline.question("Enter Todo 1: ");
  const todo_2 = readline.question("Enter Todo 2: ");

  function sendToFile() {
    return fs.writeFileSync("todos.txt", `${todo_1} ${todo_2}`);
  }

  todos.push(todo_1);
  todos.push(todo_2);

  for (const s in todos) {
    console.log(getTodos(todos));
  }

  setTimeout(() => {
    console.log(`Todo 1 | ${todo_1.toUpperCase()}`);
    console.log(`Todo 2 | ${todo_2.toUpperCase()}`);

    sendToFile();
  }, 3000);
}

class CallableFunc {
  getMain() {
    main();
  }
}

let c = new CallableFunc();
c.getMain();
