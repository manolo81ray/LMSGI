import { ContactosCard } from '@/components/main/cards/contacto/ContactosCard';
import { getContactos } from '@/model/api/frontend/contacto/apiContacto';
import { useEffect, useState } from 'react'
import type { IContacto } from '@/model/interfaces/contacto/IContacto';

import {Intro} from '@/components/main/estilos/contacto/Intro'
import TContacto from '@/components/main/estilos/contacto/TContacto'

export const Contacto = () => {
    // El hook "useState"  es una variable de estado, la que permite manejar los datos de la pagina.
    // Esta crea un estado para almacenar los cursos que se van a mostrar en la pagina
    //     - la funcion cursos se usa para acceder al estado de cursos
    //     - la funcion setCursos se usa para actualizar el estado de cursos
    //     - el estado de cursos se inicializa como un array vacio

    // variable de estado, para controlar la variable contacto, necesitamos tiparlo para que conozca cada objeto TS
    // const [contacto, setContacto] = useState<IContacto[]>([])
    const [contacto, setContacto] = useState<IContacto[]>([])


    const fetchContactos = async () => {
        const data = await getContactos()
        setContacto(data)
        //contacto=data
    }

    // - El hook useEffect se usa para ejecutar una funcion cuando el componente se monta por primera vez
    //      - El parametro [] se usa para indicar que la función se debe ejecutar solo una vez, cuando 
    //        el componente se monta por primera vez
    // El useEffect nos permite bloquear el return para poder esperar y recibir los datos de supabase y este al recibir datos,
    // nos desbloquea el return y lo ejecuta.
    useEffect(() => {
        fetchContactos() 
    }, [])

    return(
        <>

            <Intro/>
            <TContacto/>
            {
                // cuando cursos es mayor que 0, significa que ahi datos por lo que devuelve una lista <li>
                contacto.length > 0
                ? (
                    <ContactosCard contactos={contacto} />
                )
                : <p>No hay cotactos disponibles</p>
            }
        </>
    )
}