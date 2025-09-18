import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Crear el cliente de Supabase (coloca tus credenciales)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Instructor {
        name: string;
        avatar: string;
}

interface Course {
        id: number;
        title: string;
        duration: string;
        instructors: Instructor[];
        image: string;
        link: string;
}

const CursosNuevos = () => {
        const [courses, setCourses] = useState<Course[]>([]);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
                const fetchCourses = async () => {
                        try {
                                const { data, error } = await supabase
                                        .from('courses')
                                        .select('*')
                                        .order('created_at', { ascending: false })
                                        .limit(4);

                                if (error) throw error;
                                
                                if (data) {
                                        setCourses(data);
                                }
                        } catch (error) {
                                console.error('Error fetching courses:', error);
                        } finally {
                                setIsLoading(false);
                        }
                };

                fetchCourses();
        }, []);

        if (isLoading) {
                return <div>Cargando cursos...</div>;
        }

        return (
                <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Cursos nuevos</h2>
                        <div className="space-y-4">
                                {courses.map((course) => (
                                        <div key={course.id} className="flex items-center gap-4 p-4 rounded-lg shadow">
                                                <div className="w-24 h-24 relative">
                                                        <Image
                                                                src={course.image}
                                                                alt={course.title}
                                                                fill
                                                                className="object-cover rounded-lg"
                                                        />
                                                </div>
                                                <div className="flex-1">
                                                        <h3 className="font-semibold">{course.title}</h3>
                                                        <div className="flex items-center gap-2 text-sm">
                                                                <span>{course.duration}</span>
                                                                <span>•</span>
                                                                <span className="flex items-center gap-1">
                                                                        Por:
                                                                        {course.instructors.map((instructor, idx) => (
                                                                                <span key={idx} className="flex items-center">
                                                                                        <Image
                                                                                                src={instructor.avatar}
                                                                                                alt={instructor.name}
                                                                                                width={20}
                                                                                                height={20}
                                                                                                className="rounded-full"
                                                                                        />
                                                                                        <span className="ml-1">{instructor.name}</span>
                                                                                </span>
                                                                        ))}
                                                                </span>
                                                        </div>
                                                </div>
                                                <Link
                                                        href={course.link}
                                                        className="px-4 py-2 text-blue-700 border border-blue-700 rounded hover:bg-blue-50"
                                                >
                                                        Ver →
                                                </Link>
                                        </div>
                                ))}
                        </div>
                </section>
        );
};

export default CursosNuevos;