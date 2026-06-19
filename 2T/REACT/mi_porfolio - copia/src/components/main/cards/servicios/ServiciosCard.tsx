import type { IServicios } from "@/model/interfaces/servicios/IServicios";
import { ServicioCard } from "./ServicioCard";

interface Props {
    servicios: IServicios[];
}

export const ServiciosCard = ({ servicios }: Props) => {
    const KICKER = "Our Capabilities";
    const TITULO_PRINCIPAL = "Service Ecosystem";

    return (
        <section className="bg-[#0b1326] py-14">
            <div className="max-w-screen-xl mx-auto">
                
                {/* Encabezado */}
                <header className="mb-13"> {/* Aumentamos margen inferior */}
                    <span className="block font-sans text-[#e9c349] text-sm font-bold tracking-[0.25em] uppercase mb-4">
                        Our Capabilities
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl text-[#e4e7f0] leading-none tracking-tighter">
                        Service Ecosystem
                    </h1>
                </header>

                {/* Grid - Aumentamos gap a 10 para dar más aire entre bordes gruesos */}
                <div className="grid gap-10 md:grid-cols-2">
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