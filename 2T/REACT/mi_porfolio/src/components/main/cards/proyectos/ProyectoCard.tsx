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
            className="group relative block w-full overflow-hidden rounded-sm shadow-2xl transition-all duration-700"
        >
            {/* 1. Imagen del proyecto a sangre completa, proporción apaisada (16/9)
                para que las capturas de webs se vean bien con un recorte mínimo. */}
            <div className="relative bg-[#0b1326]">
                <img
                    src={proyecto.img_web}
                    alt={proyecto.titulo}
                    className="w-full h-auto grayscale-20 transition-all duration-[1.5s] ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
                {/* Overlay oscuro para legibilidad del texto superpuesto */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0b1326] via-[#0b1326]/30 to-transparent opacity-80" />
            </div>

            {/* 2. Contenedor de Información: caption flotante sobre la imagen, anclado abajo. */}
            <div className="absolute bottom-6 right-6 z-10 max-w-[calc(100%-3rem)]">
                <div className="w-fit ml-auto bg-[#1c2740]/95 p-6 xl:p-8 rounded-sm shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">

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