import { useEffect, useState } from 'react'
import type { IFormacion } from '@/model/interfaces/formacion/IFormacion'
import type { ICursos } from '@/model/interfaces/formacion/ICursos'
import { getFormaciones } from '@/model/api/frontend/formacion/apiFormacion'
import { getCursos } from '@/model/api/frontend/formacion/apiCursos'
import {FormacionesCard} from '@/components/main/cards/formacion/FormacionesCard'
import {CursosCard} from '@/components/main/cards/formacion/CursosCard'

export const Formacion = () => {

    const [formaciones, setFormaciones] = useState<IFormacion[]>([])
    const [cursos, setCursos]           = useState<ICursos[]>([])

    const fetchFormaciones = async () => {
        const data = await getFormaciones()
        setFormaciones(data)
    }

    const fetchCursos = async () => {
        const data = await getCursos()
        setCursos(data)
    }

    useEffect(() => {
        fetchFormaciones()
        fetchCursos()
    }, [])

    return (
        <>
            {
                formaciones.length > 0
                ? (
                    <FormacionesCard formaciones={formaciones} />
                )
                : <p>No hay formación disponible</p>
            }
            {
                cursos.length > 0
                ? (
                    <CursosCard cursos={cursos} />
                )
                : <p>No hay cursos disponibles</p>
            }
        </>
    )
}