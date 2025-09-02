import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";

async function main() {
  const db = await open({
    filename: "./lib/courses.db",
    driver: sqlite3.Database,
  });
  const sql = fs.readFileSync("./lib/courses.db-init.sql", "utf8");
  await db.exec(sql);
  await db.close();
  console.log("Base de datos de cursos inicializada.");
}

main();
