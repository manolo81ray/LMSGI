import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos";
import { ProyectoCard } from "@/components/main/cards/proyectos/ProyectoCard";

interface Props {
    proyectos: IProyectos[];
}

export const ProyectosCard = ({ proyectos }: Props) => {

    return (
        <section className="bg-[#131b2e] py-17 xl:py-28 px-6 lg:px-12 xl:px-16">
            <div className="max-w-screen-2xl mx-auto">

                {/* Encabezado Editorial */}
                <header className="mb-15 xl:mb-24">
                    <span className="block font-sans text-primary text-sm xl:text-base font-bold tracking-[0.25em] uppercase mb-4">
                        Diseño Web
                    </span>
                    <h1 className="mb-2 font-serif text-5xl sm:text-6xl md:text-8xl text-foreground leading-[0.9] tracking-tighter border-l-2 border-[#e9c349] pl-4">
                        Proyectos ¬
                    </h1>
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl italic text-primary font-light tracking-tighter pl-4 md:pl-[10%] md:ml-12">
                        Paginas Web
                    </h1>
                </header>

                {/* Grid de Proyectos */}
                <div className="grid gap-y-8 gap-x-16 lg:gap-x-24 xl:gap-x-32 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
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