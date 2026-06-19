import dataServicios from "../model/data/servicios.json"

const Servicios1 = () => {
    // aqui va el codigo JS o TS
    // Y UN RETURN ---> html 
    return(
        <section id="servicios" className="min-h-screen flex items-center justify-center flex-col">
            <h1 className="bg-gray-900 py-24 sm:py-22">
                Servicios
            </h1>
            <ul>
                    {
                    dataServicios.map( (servicio) => (
                            // IMPORTANTE si dentro de esta funcion de flecha no vamos a escribir 
                            // ni codigo  Codigo JS o TS, OMITIMOS EL RETURN AL COMPLETO.
                            <li 
                                key={servicio.id}
                                className="text-cyan-700 list-decimal text-left">
                                    {servicio.titulo}
                            </li>
                        ))
                        
                    }
                </ul>
        </section>
    )
}

export default Servicios1;