import { useEffect, useState } from 'react'
import type { IDescripcion } from '@/model/interfaces/home/IDescripcion'
import type { ILenguajes } from '@/model/interfaces/home/ILenguajes'
import { getDescripciones } from '@/model/api/frontend/home/apiDescripciones'
import { getLenguajes } from '@/model/api/frontend/home/apiLenguajes'
import { DescripcionesCard } from '@/components/main/cards/home/DescripcionesCard'
import { LenguajesCard } from '@/components/main/cards/home/LenguajesCard'
import { LoadingDatos } from '@/components/shared/LoadingDatos'
import { useRealtime } from '@/hooks/useRealtime'

export const QSomos = () => {

    const [descripcion, setDescripcion] = useState<IDescripcion[]>([])
    const [lenguajes, setLenguajes]     = useState<ILenguajes[]>([])
    const [loading, setLoading]         = useState(true)

    const fetchDescripcion = async () => {
        const data = await getDescripciones()
        setDescripcion(data)
    }

    const fetchLenguajes = async () => {
        const data = await getLenguajes()
        setLenguajes(data)
    }

    useEffect(() => {
        Promise.all([fetchDescripcion(), fetchLenguajes()]).finally(() => setLoading(false))
    }, [])

    // Refresca en vivo cuando se edita la descripción o los lenguajes desde el admin
    useRealtime(['descripcion', 'lenguajes'], () => {
        fetchDescripcion()
        fetchLenguajes()
    })

    if (loading) return <LoadingDatos />

    return (
        <>
            {
                descripcion.length > 0
                ? (
                    <DescripcionesCard descripciones={descripcion} />
                )
                : <p>No hay descripción disponible</p>
            }
            {
                lenguajes.length > 0
                ? (
                    <LenguajesCard lenguajes={lenguajes} />
                )
                : <p>No hay lenguajes disponibles</p>
            }
        </>
    )
}