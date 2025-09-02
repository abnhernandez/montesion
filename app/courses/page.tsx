"use client"


import { useEffect, useState } from "react";
import Image from "next/image";

type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  students: number;
  instructor: string;
  is_new: boolean;
};

export default function CoursesLanding() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses?page=1&pageSize=20")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.results);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Encuentra nuevos cursos</h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Image src="/bible.webp" width={80} height={80} alt="Cargando" className="mx-auto mb-2" />
          <p className="text-lg text-muted-foreground">Cargando cursos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-card rounded-xl shadow p-4 flex flex-col gap-2 hover:scale-[1.03] transition">
              <Image src={course.image || "/bible.webp"} width={80} height={80} alt={course.title} className="mx-auto mb-2 rounded" />
              <h2 className="text-xl font-semibold mb-1 text-center">{course.title}</h2>
              <p className="text-muted-foreground text-sm text-center">{course.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs bg-primary text-white px-2 py-1 rounded">{course.category}</span>
                {course.is_new && <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded">Nuevo</span>}
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span>⭐ {course.rating}</span>
                <span>{course.students} inscritos</span>
              </div>
              <span className="text-xs text-right text-muted-foreground">Por {course.instructor}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}