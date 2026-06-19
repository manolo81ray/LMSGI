import type { IServicio } from "@/model/interfaces/IServicio";
import { useParams } from "react-router-dom";
import dataServicios from "@/model/data/servicios.json";

export const ServicioDetalle = () => {
    const {id} = useParams(); //id obtenemos de la URL y de tipo string
    const servicio: IServicio | undefined = dataServicios.find((serv) => serv.id === Number(id))

    return(
        <div>
            <h1>Detalle del Servicio</h1>
            {
                servicio ? (
                    <div className="px-6 pt-16 py-10 justify-center">
                        <p><strong>Nombre:</strong>{servicio.id}</p> 
                        <p><strong>Descripcion:</strong>{servicio.descripcion}</p> 
                        <p><strong>Categoria:</strong>{servicio.categoria}</p> 
                    </div>
                ) : (
                    <p>Servicio no encontrado</p>
                )
            }
        </div>
    )
}