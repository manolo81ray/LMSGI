import type { ICursos } from "@/model/interfaces/formacion/ICursos";
import { Link } from "react-router-dom";

interface Props {
    curso: ICursos;
}

export const CursoCard = ({ curso }: Props) => {

    const formatearFecha = (fechaIso: string | Date) => {
        if (!fechaIso) return "Presente";
        const fecha = new Date(fechaIso);
        const formateado = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(fecha);
        return formateado;
    };

    const getColorPlataforma = (plataforma: string) => {
        const nombre = plataforma.toLowerCase();
        if (nombre.includes("udemy")) return "bg-[#ec5252]"; 
        if (nombre.includes("aws") || nombre.includes("amazon")) return "bg-[#ff9900]"; 
        if (nombre.includes("coursera")) return "bg-[#2a73cc]"; 
        return "bg-[#e9c349]"; 
    };

    return (
        <Link 
            to={`/curso/${curso.id}`}
            // CAMBIO 1: Quitamos 'h-full' para que no se estire y reducimos un poco el padding (de p-5 a p-4 md:p-5)
            className="group flex flex-col bg-[#131b2e] rounded-2xl p-4 md:p-5 border border-[#e4e7f0]/5 shadow-[0_24px_48px_rgba(0,0,0,0.12)] hover:border-[#e9c349]/20 hover:-translate-y-2 transition-all duration-500"
        >
            {/* Contenedor de la Imagen (Margen reducido de mb-6 a mb-4) */}
            <div className="w-full rounded-xl overflow-hidden bg-[#0b1326] mb-4 relative border border-[#e4e7f0]/5">
                <img 
                    src={curso.imagen} 
                    alt={curso.titulo}
                    className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
            </div>

            {/* Metadatos: Fecha y Plataforma (Margen reducido de mb-4 a mb-3) */}
            <div className="flex justify-between items-center mb-3">
                <span className="font-sans text-[14px] font-semibold tracking-wide text-[#e4e7f0]/50">
                    {formatearFecha(curso.fecha)}
                </span>
                
                <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${getColorPlataforma(curso.plataforma)} shadow-sm`}></span>
                    <span className="font-sans text-[11px] font-bold tracking-wide text-[#e4e7f0]">
                        {curso.plataforma}
                    </span>
                </div>
            </div>

            {/* Título (Margen reducido de mb-4 a mb-2) */}
            <h3 className="font-serif text-[22px] text-[#e4e7f0] leading-[1.3] mb-2 group-hover:text-[#e9c349] transition-colors duration-300">
                {curso.titulo}
            </h3>

            {/* Descripción (CAMBIO 2: Quitamos 'flex-grow' y reducimos margen de mb-6 a mb-4) */}
            <p className="font-sans text-[#e4e7f0]/60 text-sm leading-[1.6] font-light mb-4 line-clamp-3">
                {curso.descripcion}
            </p>

            {/* Etiquetas (Margen reducido de mb-8 a mb-5) */}
            <div className="flex flex-wrap gap-2 mb-5">
                {curso.etiquetas?.map((tag, index) => (
                    <span 
                        key={index}
                        className="px-3 py-1 bg-[#e4e7f0]/5 border border-[#e4e7f0]/10 rounded-full font-sans text-[10px] text-[#e4e7f0]/60 tracking-wider"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer: Ver Certificado (CAMBIO 3: Quitamos 'mt-auto') */}
            <div className="pt-4 border-t border-[#e4e7f0]/5 flex justify-center items-center">
                <div className="flex items-center gap-2 text-[#e9c349] text-xs font-bold tracking-[0.1em] transition-transform duration-300 group-hover:scale-105">
                    <span>Ver certificado</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                        <path d="M11 13l9 -9" />
                        <path d="M15 4h5v5" />
                    </svg>
                </div>
            </div>
        </Link>
    );
};