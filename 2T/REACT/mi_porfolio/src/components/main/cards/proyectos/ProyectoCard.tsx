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
            className="group block w-full overflow-hidden rounded-sm border border-[#e9c349]/60 transition-all duration-700 md:relative md:aspect-4/5"
        >
            {/* 1. Imagen del proyecto.
                - Móvil: se muestra completa (object-contain) sin recortar, con su alto natural.
                - Desktop (md+): vuelve a ser fondo a pantalla completa de la card (object-cover). */}
            <div className="relative bg-[#0b1326] md:absolute md:inset-0 md:z-0">
                <img
                    src={proyecto.img_web}
                    alt={proyecto.titulo}
                    className="w-full h-auto object-contain grayscale-20 transition-all duration-[1.5s] ease-out group-hover:grayscale-0 md:h-full md:object-cover md:group-hover:scale-110"
                />
                {/* Overlay oscuro sutil para legibilidad (solo relevante en desktop, donde el texto va encima) */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0b1326] via-transparent to-transparent opacity-60" />
            </div>

            {/* 2. Contenedor de Información.
                - Móvil: se coloca justo debajo de la imagen (flujo normal).
                - Desktop (md+): caption flotante (glassmorphism) sobre la foto. */}
            <div className="md:absolute md:bottom-6 md:left-6 md:right-6 md:z-10">
                <div className="bg-[#1c2740] p-8 xl:p-11 border-t border-[#e9c349]/60 md:rounded-sm md:border md:border-[#e9c349]/60 md:shadow-2xl md:transform md:translate-y-4 md:group-hover:translate-y-0 md:transition-transform md:duration-500">

                    {/* Tags / Etiquetas */}
                    <div className="flex flex-wrap gap-2 xl:gap-3 mb-4 xl:mb-6">
                        {proyecto.etiquetas.map((tag, i) => (
                            <span
                                key={i}
                                className={`px-2 py-1 xl:px-3 xl:py-1.5 text-[10px] xl:text-xs tracking- font-sans font-bold uppercase border ${
                                    i === 0
                                    ? "bg-[#e9c349] border-[#e9c349] text-[#0b1326]"
                                    : "border-[#e4e7f0]/20 text-[#e4e7f0]"
                                }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Kicker: Categoría \ Año */}
                    <span className="block font-sans text-[11px] xl:text-sm font-semibold tracking-[0.2em] text-[#e4e7f0]/60 uppercase mb-2">
                        {proyecto.tecnologia} \ {year}
                    </span>

                    {/* Título: Noto Serif */}
                    <h3 className="font-serif text-3xl md:text-4xl xl:text-5xl text-[#e9c349] leading-tight mb-6 xl:mb-8">
                        {proyecto.titulo}
                    </h3>

                    {/* Enlace decorativo */}
                    <div className="flex items-center gap-2 text-[#e4e7f0] text-xs xl:text-sm font-sans tracking-widest uppercase group-hover:gap-4 transition-all">
                        <span>View Project</span>
                        <span className="text-[#e9c349]">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};