import { useEffect, useState } from 'react'
import type { IProyectos } from '@/model/interfaces/proyectos/IProyectos'
import { getProyectos } from '@/model/api/frontend/proyectos/apiProyectos'
import { ProyectosCard } from '@/components/main/cards/proyectos/ProyectosCard'

export const Proyectos = () => {

    const [proyectos, setProyectos] = useState<IProyectos[]>([])

    const fetchProyectos = async () => {
        const data = await getProyectos()
        setProyectos(data)
    }

    useEffect(() => {
        fetchProyectos()
    }, [])

    return (
        (
            proyectos.length > 0
            ? (
                <ProyectosCard proyectos={proyectos} />
            )
            : <p>No hay proyectos disponibles</p>
        )
    )
}


