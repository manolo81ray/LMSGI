import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos";
import { Link } from "react-router-dom";

interface Props {
    proyecto: IProyectos;
}

export const ProyectoCard = ({ proyecto }: Props) => {
    // Extraemos el año de la fecha
    const year = new Date(proyecto.fecha_creacion).getFullYear();

    return (
        <Link 
            to={`/proyecto/${proyecto.id}`}
            className="group relative block w-full aspect-[4/5] overflow-hidden rounded-sm transition-all duration-700"
        >
            {/* 1. Imagen de fondo con efecto Zoom al hacer hover */}
            <div className="absolute inset-0 z-0">
                <img 
                    src=""
                    alt="4"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                />
                {/* Overlay oscuro sutil para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent opacity-60" />
            </div>

            {/* 2. Contenedor de Información (Glassmorphism) */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="bg-[#131b2e]/60 backdrop-blur-xl p-8 rounded-sm border border-[#e4e7f0]/10 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    
                    {/* Tags / Etiquetas */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {proyecto.etiquetas.map((tag, i) => (
                            <span 
                                key={i}
                                className={`px-2 py-1 text-[10px] tracking-[0.1em] font-sans font-bold uppercase border ${
                                    i === 0 
                                    ? "bg-[#e9c349] border-[#e9c349] text-[#0b1326]" 
                                    : "border-[#e4e7f0]/20 text-[#e4e7f0]"
                                }`}
                            >
                                122
                            </span>
                        ))}
                    </div>

                    {/* Kicker: Categoría \ Año */}
                    <span className="block font-sans text-[11px] font-semibold tracking-[0.2em] text-[#e4e7f0]/60 uppercase mb-2">
                        {proyecto.tecnologia} \ 2006
                    </span>

                    {/* Título: Noto Serif */}
                    <h3 className="font-serif text-3xl md:text-4xl text-[#e9c349] leading-tight mb-6">
                        {proyecto.titulo}
                    </h3>

                    {/* Enlace decorativo */}
                    <div className="flex items-center gap-2 text-[#e4e7f0] text-xs font-sans tracking-widest uppercase group-hover:gap-4 transition-all">
                        <span>View Project</span>
                        <span className="text-[#e9c349]">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};