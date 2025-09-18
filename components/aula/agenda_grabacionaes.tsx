import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

// Define the types for our recording data
interface Recording {
    id: number;
    title: string;
    duration: string;
    thumbnail_url: string;
    recording_url: string;
    created_at: string;
}

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AgendaGrabaciones() {
    const [recordings, setRecordings] = useState<Recording[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRecordings() {
            try {
                const { data, error } = await supabase
                    .from('recordings')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setRecordings(data || []);
            } catch (error) {
                console.error('Error fetching recordings:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRecordings();
    }, []);

    if (isLoading) {
        return <div>Cargando grabaciones...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Grabaciones de Clases de Bootcamp</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recordings.map((recording) => (
                    <Card key={recording.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg">{recording.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock size={16} />
                                <span>{recording.duration}</span>
                            </div>
                            {recording.thumbnail_url && (
                                <Image
                                    src={recording.thumbnail_url}
                                    alt={recording.title}
                                    width={400}
                                    height={160}
                                    className="w-full h-40 object-cover mt-4 rounded-md"
                                />
                            )}
                            <a
                                href={recording.recording_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Ver Grabación
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}