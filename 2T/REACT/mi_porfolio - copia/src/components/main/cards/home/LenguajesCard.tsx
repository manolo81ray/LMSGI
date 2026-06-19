import type { ILenguajes } from "@/model/interfaces/home/ILenguajes";
import { LenguajeCard } from "@/components/main/cards/home/LenguajeCard";

interface Props {
    lenguajes: ILenguajes[];
}

export const LenguajesCard = ({ lenguajes }: Props) => {
    
    const skills = [
        { nombre: "Ingeniería de Software", porcentaje: 95 },
        { nombre: "Arquitectura web", porcentaje: 88 },
        { nombre: "Infraestructura en la nube", porcentaje: 75 },
    ];

    return (
        <section className="bg-[#0b1326] py-24 px-6 lg:px-24 min-h-screen flex items-center">
            <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
                
                {/* COLUMNA IZQUIERDA: Textos y Barras */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                    
                    {/* Título (Editorial Anchor) */}
                    <h2 className="font-serif text-5xl md:text-6xl text-[#e4e7f0] leading-tight tracking-tight mb-6">
                        Lenguajes Aprendidos
                    </h2>

                    {/* Descripción */}
                    <p className="font-sans text-[#e4e7f0]/60 text-lg leading-[1.8] font-light mb-12 max-w-lg">
                        Una cuidada selección de herramientas elegidas por su fiabilidad,
                        rendimiento y experiencia de desarrollador. Mi conjunto de herramientas está optimizado
                        para la excelencia web moderna y como futuro tecnico de ASIR.
                    </p>

                    {/* Barras de Progreso */}
                    <div className="flex flex-col gap-8">
                        {skills.map((skill, index) => (
                            <div key={index} className="w-full">
                                {/* Textos de la barra */}
                                <div className="flex justify-between items-end mb-3">
                                    <span className="font-sans text-sm font-bold tracking-wide text-[#e4e7f0]">
                                        {skill.nombre}
                                    </span>
                                    <span className="font-sans text-sm font-medium text-[#e9c349]">
                                        {skill.porcentaje}%
                                    </span>
                                </div>
                                
                                {/* Track y Relleno de la barra (Sovereign Style) */}
                                <div className="w-full h-[3px] bg-[#131b2e] rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-[#e9c349] to-[#9d7d00] rounded-full relative"
                                        style={{ width: `${skill.porcentaje}%` }}
                                    >
                                        {/* Brillo en la punta de la barra */}
                                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLUMNA DERECHA: Grid de Tecnologías */}
                <div className="lg:col-span-7">
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
                        {lenguajes.map((lenguaje) => (
                            <LenguajeCard
                                key={lenguaje.id_lenguaje}
                                lenguaje={lenguaje}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}