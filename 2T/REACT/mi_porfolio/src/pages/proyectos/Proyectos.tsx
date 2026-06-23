import { useEffect, useState } from 'react'
import type { IProyectos } from '@/model/interfaces/proyectos/IProyectos'
import { getProyectos } from '@/model/api/frontend/proyectos/apiProyectos'
import { ProyectosCard } from '@/components/main/cards/proyectos/ProyectosCard'
import { LoadingDatos } from '@/components/shared/LoadingDatos'
import { useRealtime } from '@/hooks/useRealtime'

export const Proyectos = () => {

    const [proyectos, setProyectos] = useState<IProyectos[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProyectos = async () => {
        const data = await getProyectos()
        setProyectos(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchProyectos()
    }, [])

    // Refresca en vivo cuando se edita un proyecto desde el panel admin
    useRealtime('proyectos', fetchProyectos)

    if (loading) return <LoadingDatos />

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


