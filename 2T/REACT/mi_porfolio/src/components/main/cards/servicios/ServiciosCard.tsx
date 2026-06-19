import type { IServicios } from "@/model/interfaces/servicios/IServicios";
import { ServicioCard } from "./ServicioCard";

interface Props {
    servicios: IServicios[];
}

export const ServiciosCard = ({ servicios }: Props) => {
    return (
        <section className="bg-background py-14 xl:py-24 px-6 lg:px-24 xl:px-32">
            <div className="max-w-7xl xl:max-w-screen-2xl mx-auto">

                {/* Encabezado */}
                <header className="mb-13 xl:mb-20">
                    <span className="block font-sans text-primary text-sm xl:text-base font-bold tracking-[0.25em] uppercase mb-4">
                        Our Capabilities
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl text-foreground leading-none tracking-tighter border-l-2 border-[#e9c349] pl-4 xl:pl-6">
                        Service Ecosystem
                    </h1>
                </header>

                {/* Grid - Aumentamos gap a 10 para dar más aire entre bordes gruesos */}
                <div className="grid gap-10 xl:gap-14 md:grid-cols-2">
                    {servicios.map((servicio) => (
                        <ServicioCard
                            key={servicio.id}
                            servicio={servicio}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}