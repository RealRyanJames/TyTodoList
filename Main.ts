import readline from "readline-sync";
import fs from "fs";
import { MongoClient } from "mongodb";

const getTodos = (a: string[]) => {
  return a.reduce((index, e) => index + e);
};

interface DataDB {
  getDBContext(data: string): void;
}

interface IDataTodos {
  getDate(): void;
}

class DataDBContext implements DataDB {
  toLower(uri: string): string {
    return uri.toLowerCase();
  }

  getURL(): string {
    return this.toLower("www.mongodb://localhost:27017");
  }

  async getDBContext(data: string): Promise<void> {
    const dbClient = new MongoClient(this.getURL());
    const db = dbClient.db("todos");
    const coll = db.collection("todo");
    await coll.insertOne({ "Todos:": data });
  }

  async setup(data: string): Promise<void> {
    await this.getDBContext(data);
  }
}

class Dates implements IDataTodos {
  getDate(): void {
    const tDate = Temporal.Now.plainDateTimeISO().toPlainTime();
    console.log(`${tDate.hour}:${tDate.minute}:${tDate.second.toFixed(2)}`);
  }
}

const date = new Dates();
date.getDate();

async function main() {
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
    const newDB = new DataDBContext();
    await newDB.setup(getTodos(todos));
  }

  setTimeout(() => {
    console.log(`Todo 1 | ${todo_1.toUpperCase()}`);
    console.log(`Todo 2 | ${todo_2.toUpperCase()}`);

    sendToFile();
  }, 3000);
}

main();
