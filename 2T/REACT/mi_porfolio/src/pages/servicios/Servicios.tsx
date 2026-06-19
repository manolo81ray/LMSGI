import { useEffect, useState } from 'react'
import type { IServicios } from '@/model/interfaces/servicios/IServicios'
import { getServicios } from '@/model/api/frontend/servicios/apiServicios'
import { ServiciosCard } from '@/components/main/cards/servicios/ServiciosCard'
import { LoadingDatos } from '@/components/shared/LoadingDatos'

export const Servicios = () => {

    const [servicios, setServicios] = useState<IServicios[]>([])
    const [loading, setLoading] = useState(true)

    const fetchServicios = async () => {
        const data = await getServicios()
        setServicios(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchServicios()
    }, [])

    if (loading) return <LoadingDatos />

    return (
        (
            servicios.length > 0
            ? (
                <ServiciosCard servicios={servicios} />
            )
            : <p>No hay servicios disponibles</p>
        )     
    )
}