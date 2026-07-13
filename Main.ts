import readline from "readline-sync";
import fs from "fs";

const getTodos = (a: string[]) => {
  return a.reduce((index, e) => index + e);
};

function getTodayDate() {
  const tDate = Temporal.Now.plainDateTimeISO().toPlainTime();
  return tDate;
}

console.log(`${getTodayDate().hour}:${getTodayDate().minute}:${getTodayDate().second.toFixed(2)}
`);

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
