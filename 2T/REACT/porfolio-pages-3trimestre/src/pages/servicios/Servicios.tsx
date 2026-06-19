import { ServiciosCard } from "@/components/main/servicios/ServiciosCard";
import dataServicios from "@/model/data/servicios.json";

export const Servicios = () => {
    return (
        <section
        id="servicios"
        className="min-h-screen flex flex-col items-center pt-16 justify-center"
        >
        <h1 className="text-4xl py-15 sm:py-4 mb-5 font-bold text-center text-white">
            Servicios Ofrecidos:
        </h1>
        <ServiciosCard servicios={dataServicios} />
        </section>
    );
};
