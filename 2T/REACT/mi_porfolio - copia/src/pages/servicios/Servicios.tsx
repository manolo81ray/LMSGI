import { useEffect, useState } from 'react'
import type { IServicios } from '@/model/interfaces/servicios/IServicios'
import { getServicios } from '@/model/api/frontend/servicios/apiServicios'
import { ServiciosCard } from '@/components/main/cards/servicios/ServiciosCard'

export const Servicios = () => {

    const [servicios, setServicios] = useState<IServicios[]>([])

    const fetchServicios = async () => {
        const data = await getServicios()
        setServicios(data)
    }

    useEffect(() => {
        fetchServicios()
    }, [])

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