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
        <article className="relative w-full bg-[#e6ebf0] overflow-hidden pt-12 lg:pt-20 pb-16 lg:pb-40 px-6 lg:px-24 xl:px-32 flex items-start md:items-center min-h-screen">

            <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-16 items-center relative z-10">
                
                {/* ---------------- IZQUIERDA: Textos ---------------- */}
                <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center text-center md:items-start md:text-left lg:pl-16">

                    {/* Kicker */}
                    <span className="block font-sans text-[#e9c349] text-[11px] xl:text-sm font-bold tracking-[0.25em] uppercase mb-5 md:mb-8 xl:mb-10">
                        {descripcion.saludo || "The Creative Portfolio"}
                    </span>

                    {/* Titular Editorial (Normal + Itálica) */}
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-[100px] xl:text-[125px] text-[#0b1326] leading-[0.95] tracking-tight mb-6 md:mb-8 xl:mb-10 lg:whitespace-nowrap">
                        {firstName} <span className="italic font-light text-[#2d3449]">{lastName}</span>
                    </h1>

                    {/* Biografía / Subtítulo */}
                    <p className="font-sans text-[#2d3449]/80 text-xl md:text-2xl xl:text-3xl leading-relaxed font-light mb-8 md:mb-12 xl:mb-16 max-w-xl xl:max-w-2xl">
                        {descripcion.subtitulo || descripcion.biografia}
                    </p>

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 xl:gap-10">
                        {/* Primary Action (Invertido para fondo claro según tu imagen) */}
                        <a
                            href={descripcion.curriculum_url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#0b1326] text-[#e4e7f0] px-8 py-4 xl:px-10 xl:py-5 rounded-md font-sans text-sm xl:text-base font-semibold shadow-[0_12px_24px_rgba(11,19,38,0.2)] hover:bg-[#131b2e] hover:-translate-y-1 transition-all duration-300"
                        >
                            Ver mi CV
                        </a>

                        {/* Tertiary Action (Estilo Editorial con línea dorada) */}
                        <button className="group flex items-center gap-4 text-[#0b1326] font-sans text-sm xl:text-base font-bold tracking-wide uppercase">
                            <span>Lee mi Portfolio</span>
                            <span className="block h-px w-12 xl:w-16 bg-[#e9c349] transition-all duration-500 group-hover:w-24"></span>
                        </button>
                    </div>
                </div>

                {/* ---------------- DERECHA: Imagen con Asimetría ---------------- */}
                <div className="col-span-1 lg:col-span-5 lg:col-start-8 relative mt-2 lg:mt-0 w-full max-w-[420px] lg:max-w-none mx-auto lg:ml-auto lg:mr-0">

                    {/* Ghost Border (Marco fantasma desfasado hacia arriba a la derecha) */}
                    <div className="absolute top-7.5 right-7.5 w-full h-full border-2 border-[#e9c349]/20 rounded-sm z-0 hidden md:block"></div>

                    {/* Imagen Principal */}
                    <div className="relative z-10 w-full aspect-square md:aspect-4/5 bg-[#0b1326] shadow-[0_48px_100px_rgba(11,19,38,0.3)] rounded-sm overflow-hidden group">
                        {descripcion.foto ? (
                            <img 
                                src={descripcion.foto} 
                                alt={descripcion.nombre}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                            />
                        ) : (
                            // Fallback si no hay foto
                            <div className="w-full h-full flex items-center justify-center text-[#e4e7f0]/20 font-serif italic text-2xl">
                                FOTO
                            </div>
                        )}
                        
                        {/* Sutil viñeteado interior para darle profundidad */}
                        <div className="absolute inset-0 bg-linear-to-tr from-[#0b1326]/20 via-transparent to-transparent opacity-30"></div>
                    </div>
                </div>

            </div>
        </article>
    );
};