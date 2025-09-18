import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient'; // Asegúrate de tener configurado tu cliente de Supabase

interface BannerContent {
    title: string;
    features: string[];
    buttonText: string;
    buttonUrl: string;
}

interface AgendaBannerProps {
    className?: string;
}

const AgendaBanner: FC<AgendaBannerProps> = ({ className }) => {
    const [content, setContent] = useState<BannerContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBannerContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('banner_content')
                    .select('*')
                    .single();

                if (error) throw error;
                setContent(data);
            } catch (error) {
                console.error('Error fetching banner content:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBannerContent();
    }, []);

    if (isLoading) return <div>Cargando...</div>;
    if (!content) return null;

    return (
        <div className={`rounded-lg p-6 shadow-md ${className}`}>
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    {content.title}
                </h2>
                
                <ul className="space-y-2">
                    {content.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <CheckIcon className="w-5 h-5 text-primary" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => window.location.href = content.buttonUrl}
                >
                    {content.buttonText}
                </Button>
            </div>
        </div>
    );
};

const CheckIcon = ({ className }: { className?: string }) => (
    <svg 
        className={className} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7"
        />
    </svg>
);

export default AgendaBanner;