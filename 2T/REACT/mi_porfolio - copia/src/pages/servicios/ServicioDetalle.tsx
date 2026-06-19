import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { IServicios } from "@/model/interfaces/servicios/IServicios";
import { getServicioId } from "@/model/api/frontend/servicios/apiServicios";

export const ServicioDetalle = () => {
    const { id } = useParams();
    
    const [servicio, setServicio] = useState<IServicios | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchServicio = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                const data = await getServicioId(id);
                
                if (data) {
                    setServicio(data);
                } else {
                    setError(true);
                }

            } catch (err) {
                console.error("Error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchServicio();
    }, [id]);

    // ==========================================
    // 1. SOLUCIÓN: PANTALLA DE CARGA
    // Si está cargando, mostramos esto y evitamos el error de 'null'
    // ==========================================
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b1326] flex items-center justify-center">
                <span className="font-serif text-3xl text-[#e9c349] italic font-light animate-pulse">
                    Retrieving Data...
                </span>
            </div>
        );
    }

    // ==========================================
    // 2. SOLUCIÓN: PANTALLA SI NO EXISTE EL SERVICIO
    // Si dio error o el servicio sigue siendo null, mostramos esto
    // ==========================================
    if (error || !servicio) {
        return (
            <div className="min-h-screen bg-[#0b1326] flex flex-col items-center justify-center text-center px-6">
                <h1 className="font-serif text-5xl text-[#e4e7f0] mb-6">Service <span className="italic text-[#e9c349]">Not Found</span></h1>
                <Link to="/servicios" className="text-[#e9c349] font-sans text-sm font-bold tracking-[0.2em] uppercase border-b border-[#e9c349]/30 pb-1 hover:border-[#e9c349] transition-colors">
                    ← Back to Ecosystem
                </Link>
            </div>
        );
    }

    // A partir de aquí, TypeScript ya sabe al 100% que 'servicio' NO es null
    return (
        <article className="bg-[#0b1326] min-h-screen text-[#e4e7f0] font-sans selection:bg-[#e9c349] selection:text-[#0b1326]">
            
            {/* HERO SECTION */}
            <section className="pt-32 pb-24 px-6 lg:px-24 max-w-screen-2xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    <div className="flex flex-col">
                        <span className="font-sans text-[#e9c349] text-[10px] font-bold tracking-[0.25em] uppercase mb-6">
                            {servicio.tipo}
                        </span>
                        
                        <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight mb-8">
                          {servicio.nombre}
                        </h1>
                        
                        <p className="text-[#e4e7f0]/70 text-lg leading-[1.8] font-light mb-12 max-w-lg">
                            {servicio.descripcion}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                            <span className="font-serif text-[#e9c349] text-4xl tracking-tight">
                                {servicio.precio} €
                            </span>
                            <Link 
                                to="/contacto" 
                                className="bg-gradient-to-br from-[#e9c349] to-[#9d7d00] text-[#0b1326] font-bold text-sm px-8 py-4 rounded-md shadow-[0_12px_24px_rgba(233,195,73,0.2)] hover:scale-105 transition-transform duration-300 flex items-center gap-3"
                            >
                                Contactame 
                                <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Composición Visual con Glassmorphism */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0b1326] border border-[#e4e7f0]/5 flex items-center justify-center group shadow-[0_24px_48px_rgba(0,0,0,0.3)]">
                        
                        {/* 1. Imagen Real del Servicio */}
                        <img 
                            src={servicio.imagen} 
                            alt={servicio.nombre}
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                        />

                        {/* 2. Filtro sutil para asegurar que la etiqueta inferior se lea bien */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326]/80 via-transparent to-transparent pointer-events-none"></div>

                        {/* 3. Tarjeta Glassmorphism flotante (Mantenida intacta) */}
                        <div className="absolute left-6 bottom-6 bg-[#131b2e]/60 backdrop-blur-xl border border-[#e4e7f0]/10 p-5 rounded-lg flex items-center gap-4 transform transition-transform duration-700 group-hover:-translate-y-2">
                            <div className="w-8 h-8 rounded-full bg-[#e9c349]/20 flex items-center justify-center text-[#e9c349] shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            </div>
                            <div>
                                <span className="block font-bold text-[#e4e7f0] text-sm">Calidades Premium </span>
                                <span className="block font-light text-[#e4e7f0]/60 text-xs">Experiencias digitales a medida.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </article>
    );
};