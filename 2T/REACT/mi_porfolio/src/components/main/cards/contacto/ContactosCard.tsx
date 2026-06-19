import type {IContacto} from "@/model/interfaces/contacto/IContacto";
import { ContactoCard } from "@/components/main/cards/contacto/ContactoCard";
// define las propiedades de entrada del componente ServiciosCard
//arrai de servicios
interface Props {
    contactos:IContacto[];
}

export const ContactosCard = ({contactos}: Props) => {
    
    return(
        <section className=""> 
            <div className="">
                {
                    contactos.map((contacto) => (
                        // le pasamos a ServicioCard cada objeto
                        <ContactoCard
                        // Parametro de entrada del componente ServicioCard
                            key={contacto.id}
                            contacto={contacto}
                        />
                    )) 
                }
            </div>
        </section>
    )
}
