import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos";
import { ProyectoCard } from "@/components/main/cards/proyectos/ProyectoCard";

interface Props {
    proyectos: IProyectos[];
}

export const ProyectosCard = ({ proyectos }: Props) => {
    
    return (
        <section className="bg-[#0b1326] py-17 px-6 lg:px-24">
            <div className="max-w-screen-2xl mx-auto">
                
                {/* Encabezado Editorial */}
                <header className="mb-15  ">
                    <span className="block font-sans text-[#e9c349] text-sm font-bold tracking-[0.25em] uppercase mb-4">
                        Diseño Web
                    </span>
                    <h1 className="mb-2 font-serif text-6xl md:text-8xl  text-[#e4e7f0]  leading-[0.9] tracking-tighter">
                        Proyectos ¬
                    </h1>
                    <h1 className="font-serif text-6xl md:text-8xl italic text-[#e9c349] font-light tracking-tighter ml-12 md:pl-[10%]"> 
                        Paginas Web
                    </h1>
                </header>

                {/* Grid de Proyectos */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {proyectos.map((proyecto, index) => (
                        <div 
                            key={proyecto.id}
                            className={`${index % 2 !== 0 ? "md:mt-24" : ""}`} // Asimetría editorial
                        >
                            <ProyectoCard proyecto={proyecto} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}