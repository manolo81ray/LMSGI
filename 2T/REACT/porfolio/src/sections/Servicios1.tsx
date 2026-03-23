import dataservicios from '@/data/servicios.json'

const Servicios = () => {

    return (
        <section id="servicios" className="min-h-screen flex items-center justify content">
            <h1 className=" bg-gray-900 py-24 sm:py22">
                Servicios Ofrecidos
            </h1>
            <ol className='list-decimal list-inside text-left text-red-400'>
                {
                    dataservicios.map( (servicio) => (
                        <li>{servicio.titulo</li>
                    ))
                }
        </section>
    )    
}