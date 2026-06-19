import type { IDescripcion } from "@/model/interfaces/home/IDescripcion";

interface Props {
    descripcion: IDescripcion;
}

export const DescripcionCard = ({ descripcion }: Props) => {

    // Separamos el nombre para que la primera parte sea normal y el resto itálica (como "Alex Obsidian")
    const partesNombre = descripcion.nombre.trim().split(" ");
    const firstName = partesNombre[0];
    const lastName = partesNombre.slice(1).join(" ");

    return (
        // Superficie Ivory (Fondo claro con tinte frío según tu imagen)
        <article className="relative w-full bg-[#e6ebf0] overflow-hidden py-24 lg:py-40 px-6 lg:px-24 flex items-center min-h-screen">
            
            {/* Marca de agua de fondo (Watermark "Sovereign") */}
            <div className="absolute bottom-[-5%] pointer-events-none select-none overflow-hidden">
                <span className="font-serif text-[120px] md:text-[200px] lg:text-[280px] font-bold italic text-[#0b1326]/5 tracking-tighter leading-none pr-10">
                    Manuel 
                </span>
            </div>

            <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
                
                {/* ---------------- IZQUIERDA: Textos ---------------- */}
                <div className="col-span-1 lg:col-span-6 flex flex-col justify-center">
                    
                    {/* Kicker */}
                    <span className="block font-sans text-[#e9c349] text-[11px] font-bold tracking-[0.25em] uppercase mb-8">
                        {descripcion.saludo || "The Creative Portfolio"}
                    </span>

                    {/* Titular Editorial (Normal + Itálica) */}
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-[100px] text-[#0b1326] leading-[0.95] tracking-tight mb-8">
                        {firstName} <span className="italic font-light text-[#2d3449]">{lastName}</span>
                    </h1>

                    {/* Biografía / Subtítulo */}
                    <p className="font-sans text-[#2d3449]/80 text-xl md:text-2xl leading-relaxed font-light mb-12 max-w-xl">
                        {descripcion.subtitulo || descripcion.biografia}
                    </p>

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                        {/* Primary Action (Invertido para fondo claro según tu imagen) */}
                        <a 
                            href={descripcion.curriculum_url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#0b1326] text-[#e4e7f0] px-8 py-4 rounded-md font-sans text-sm font-semibold shadow-[0_12px_24px_rgba(11,19,38,0.2)] hover:bg-[#131b2e] hover:-translate-y-1 transition-all duration-300"
                        >
                            Ver mi CV
                        </a>

                        {/* Tertiary Action (Estilo Editorial con línea dorada) */}
                        <button className="group flex items-center gap-4 text-[#0b1326] font-sans text-sm font-bold tracking-wide uppercase">
                            <span>Lee mi Portfolio</span>
                            <span className="block h-[1px] w-12 bg-[#e9c349] transition-all duration-500 group-hover:w-24"></span>
                        </button>
                    </div>
                </div>

                {/* ---------------- DERECHA: Imagen con Asimetría ---------------- */}
                <div className="col-span-1 lg:col-span-5 lg:col-start-8 relative mt-12 lg:mt-0">
                    
                    {/* Ghost Border (Marco fantasma desfasado hacia arriba a la derecha) */}
                    <div className="absolute top-[-30px] right-[-30px] w-full h-full border-2 border-[#e9c349]/20 rounded-sm z-0 hidden md:block"></div>

                    {/* Imagen Principal */}
                    <div className="relative z-10 w-full aspect-square md:aspect-[4/5] bg-[#0b1326] shadow-[0_48px_100px_rgba(11,19,38,0.3)] rounded-sm overflow-hidden group">
                        {descripcion.foto ? (
                            <img 
                                src={descripcion.foto} 
                                alt={descripcion.nombre}
                                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                            />
                        ) : (
                            // Fallback si no hay foto
                            <div className="w-full h-full flex items-center justify-center text-[#e4e7f0]/20 font-serif italic text-2xl">
                                FOTO
                            </div>
                        )}
                        
                        {/* Sutil viñeteado interior para darle profundidad */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1326]/40 via-transparent to-transparent opacity-60 mix-blend-multiply"></div>
                    </div>
                </div>

            </div>
        </article>
    );
};