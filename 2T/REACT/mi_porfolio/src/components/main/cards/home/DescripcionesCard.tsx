import type { IDescripcion } from "@/model/interfaces/home/IDescripcion";
import { DescripcionCard } from "@/components/main/cards/home/DescripcionCard";

interface Props {
    descripciones: IDescripcion[];
}

export const DescripcionesCard = ({ descripciones }: Props) => {

    return (
        // Contenedor sin márgenes laterales para que el fondo 'Ivory' ocupe de lado a lado
        <section className="w-full">
            {
                descripciones.map((descripcion) => (
                    <DescripcionCard
                        key={descripcion.id}
                        descripcion={descripcion}
                    />
                ))
            }
        </section>
    );
}