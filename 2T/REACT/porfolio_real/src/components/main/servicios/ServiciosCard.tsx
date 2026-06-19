import type {IServicio} from "../../../model/interfaces/IServicio";
import {ServicioCard} from "../servicios/ServicioCard";

// define las propiedades de entrada del componente ServiciosCard
//arrai de servicios
interface Props {
    servicios:IServicio[];
}

export const ServiciosCard = ({servicios}: Props) => {
    
    return(
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-6 lg:px-24">
            {
                servicios.map((servicio) => (
                    // le pasamos a ServicioCard cada objeto
                    <ServicioCard 
                    // Parametro de entrada del componente ServicioCard
                        key={servicio.id}
                        servicio={servicio}
                    />
                )) 
            }
        </div>
    )
}
