import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase-client';


const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    type Option = { id: string | number; label: string; href: string };
    type OptionWithGroup = Option & { group: string };
    const [aprendeOptions, setAprendeOptions] = useState<Option[]>([]);
    const [productosOptions, setProductosOptions] = useState<Option[]>([]);
    const [convocatoriasOptions, setConvocatoriasOptions] = useState<Option[]>([]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<OptionWithGroup[]>([]);

    useEffect(() => {
        async function fetchOptions() {
            const [aprende, productos, convocatorias] = await Promise.all([
                supabase.from('opciones_aprende').select('*'),
                supabase.from('opciones_productos').select('*'),
                supabase.from('opciones_convocatorias').select('*'),
            ]);
            setAprendeOptions(aprende.data || []);
            setProductosOptions(productos.data || []);
            setConvocatoriasOptions(convocatorias.data || []);
        }
        fetchOptions();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        // Unir todas las opciones y filtrar por coincidencia
        const allOptions: OptionWithGroup[] = [
            ...aprendeOptions.map(opt => ({ ...opt, group: 'Aprende' })),
            ...productosOptions.map(opt => ({ ...opt, group: 'Productos' })),
            ...convocatoriasOptions.map(opt => ({ ...opt, group: 'Convocatorias' })),
        ];
        // Filtrado progresivo: primero por label que empieza, luego incluye, luego fuzzy
        let filtered = allOptions.filter(opt =>
            opt.label.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        if (filtered.length < 5) {
            const includes = allOptions.filter(opt =>
                opt.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !filtered.some(f => f.id === opt.id && f.group === opt.group)
            );
            filtered = [...filtered, ...includes];
        }
        // Si aún hay pocos resultados, mostrar todos los que tengan alguna coincidencia de letras
        if (filtered.length < 5 && searchQuery.length > 1) {
            const fuzzy = allOptions.filter(opt => {
                let match = true;
                let lastIndex = -1;
                for (const char of searchQuery.toLowerCase()) {
                    const idx = opt.label.toLowerCase().indexOf(char, lastIndex + 1);
                    if (idx === -1) { match = false; break; }
                    lastIndex = idx;
                }
                return match && !filtered.some(f => f.id === opt.id && f.group === opt.group);
            });
            filtered = [...filtered, ...fuzzy];
        }
        setFilteredSuggestions(filtered.slice(0, 10));
        setShowSuggestions(filtered.length > 0);
    }, [searchQuery, aprendeOptions, productosOptions, convocatoriasOptions]);

    return (
        <nav className="w-full flex justify-center items-center py-5 px-2">
            <div className="w-full max-w-5xl flex flex-row items-center gap-8">
                <div className="flex items-center space-x-10">
                    {/* Aprende Dropdown */}
                    <div className="relative group" onMouseEnter={() => setOpenDropdown('aprende')} onMouseLeave={() => setOpenDropdown(null)}>
                        <button className="flex items-center space-x-2 font-bold">
                            <span>Aprende</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openDropdown === 'aprende' && aprendeOptions.length > 0 && (
                            <div className="absolute left-0 mt-2 bg-white rounded-xl shadow-lg py-2 px-4 min-w-[180px] z-50 flex flex-col gap-2">
                                {aprendeOptions.map((opt: Option) => (
                                    <a key={opt.id} href={opt.href} className="hover:underline text-gray-900 py-1 px-2 rounded-lg">{opt.label}</a>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Productos Dropdown */}
                    <div className="relative group" onMouseEnter={() => setOpenDropdown('productos')} onMouseLeave={() => setOpenDropdown(null)}>
                        <button className="flex items-center space-x-2 font-bold">
                            <span>Productos</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openDropdown === 'productos' && productosOptions.length > 0 && (
                            <div className="absolute left-0 mt-2 bg-white rounded-xl shadow-lg py-2 px-4 min-w-[180px] z-50 flex flex-col gap-2">
                                {productosOptions.map((opt: Option) => (
                                    <a key={opt.id} href={opt.href} className="hover:underline text-gray-900 py-1 px-2 rounded-lg">{opt.label}</a>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Convocatorias Dropdown */}
                    <div className="relative group" onMouseEnter={() => setOpenDropdown('convocatorias')} onMouseLeave={() => setOpenDropdown(null)}>
                        <button className="flex items-center space-x-2 font-bold">
                            <span>Convocatorias</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openDropdown === 'convocatorias' && convocatoriasOptions.length > 0 && (
                            <div className="absolute left-0 mt-2 bg-white rounded-xl shadow-lg py-2 px-4 min-w-[180px] z-50 flex flex-col gap-2">
                                {convocatoriasOptions.map((opt: Option) => (
                                    <a key={opt.id} href={opt.href} className="hover:underline text-gray-900 py-1 px-2 rounded-lg">{opt.label}</a>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Buscador */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden ml-3 relative">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-[370px] h-10 px-7 py-3 focus:outline-none rounded-xl text-[1.22rem]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        />
                        <button className="px-6 py-3 rounded-xl" tabIndex={-1}>
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        {showSuggestions && (
                            <div className="absolute top-12 left-0 w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto animate-fade-in">
                                {filteredSuggestions.length > 0 ? (
                                    filteredSuggestions.map((opt) => (
                                        <a
                                            key={opt.id + '-' + opt.group}
                                            href={opt.href}
                                            className="block px-5 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-100 text-[1.1rem] rounded-xl"
                                            tabIndex={-1}
                                        >
                                            <span className="font-semibold text-primary mr-2">{opt.label}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">({opt.group})</span>
                                        </a>
                                    ))
                                ) : (
                                    <div className="px-5 py-2 text-gray-500 dark:text-gray-400">Sin resultados</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;