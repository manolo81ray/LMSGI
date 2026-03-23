import { ServiciosCard } from '@/componentes/main/servicios/ServiciosCard';
import dataServicios from '@/model/data/servicios.json';

const Servicios = () => {
    return (
        <section id="servicios" className="min-h-screen flex items-center justify content">
            <h1 className=" bg-gray-900 py-24 sm:py22">
                Servicios Ofrecidos
            </h1>
            <ServiciosCard servicios={dataServicios} />
        </section>
    )    
}