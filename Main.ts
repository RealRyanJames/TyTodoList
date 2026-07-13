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

export const todos: string[] = [];

export const todo_1 = readline.question("Enter Todo 1: ");
export const todo_2 = readline.question("Enter Todo 2: ");

export function sendToFile() {
  return fs.writeFileSync("todos.txt", `${todo_1} ${todo_2}`);
}

todos.push(todo_1);
todos.push(todo_2);

console.log(getTodos(todos));

setTimeout(() => {
  console.log(`Todo 1 | ${todo_1.toUpperCase()}`);
  console.log(`Todo 2 | ${todo_2.toUpperCase()}`);

  sendToFile();
}, 3000);
