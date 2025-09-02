import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function GET(request: Request) {
  const db = await open({
    filename: "./lib/courses.db",
    driver: sqlite3.Database,
  });

  // Filtros y paginación
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const offset = (page - 1) * pageSize;

  // Puedes agregar más filtros aquí
  const courses = await db.all(
    `SELECT * FROM courses LIMIT ? OFFSET ?`,
    [pageSize, offset]
  );
  const total = (await db.get(`SELECT COUNT(*) as count FROM courses`)).count;

  await db.close();

  return NextResponse.json({
    results: courses,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}
