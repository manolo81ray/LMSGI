import type { ICurso } from "@/model/interfaces/ICurso"
import { getCursos } from "@/model/api/backend/apiCursos"
import { useEffect, useState } from "react"

export const Cursos = () => {

    // hook es una funcion de React
    // ese hook nos va a usar el useState para almacenat los cursos que se van a mostrar en la pagina,
    // donde para ver usara la variable "cursos" y para modificar se usara "setCursos"
    const [cursos, setCursos] = useState<ICurso[]>([])

    const fetchCursos = async () => {
        const data = await getCursos()
        setCursos(data)
    }

    useEffect(() => {
        fetchCursos()
    }, [])

    return (
        <section id="cursos" className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Cursos</h2>
                        <p className="mt-2 text-lg/8 text-gray-300">Cursos realizados</p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {cursos.map((curso) => (
                            <article key={curso.id}
                                className="flex max-w-xl flex-col items-start justify-between
                                            rounded-md border-2 border-gray-700 p-3 hover:bg-gray-800">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={curso.fecha} className="text-gray-400">
                                        {curso.fecha}
                                    </time>
                                    <span className="relative z-10 rounded-full bg-yellow-800/30 px-3 py-1.5 font-medium
                                                        text-gray-300">
                                        {curso.plataforma}
                                    </span>
                                </div>
                                <div className="group relative grow">
                                    {curso.imagen && (
                                        <img alt={curso.titulo} src={curso.imagen} className="mt-3 h-40 w-full rounded-md object-cover" />
                                    )}
                                    <h3 className="mt-3 text-lg/6 font-semibold text-orange-700 group-hover:text-gray-300">
                                        {curso.titulo}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">{curso.descripcion}</p>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm/6">
                                    {curso.etiquetas?.map((etiqueta) => (
                                        <span key={etiqueta} className="rounded-full bg-gray-800 px-3 py-1 text-gray-300">
                                            {etiqueta}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 flex w-full items-center justify-between text-sm/6 text-gray-400">
                                    <span>{curso.impartido}</span>
                                    <span className="font-semibold text-white">{curso.precio}€</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
