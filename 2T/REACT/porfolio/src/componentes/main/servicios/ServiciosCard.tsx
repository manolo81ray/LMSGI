
interface Props {
    servicios: IServicio[];
},


export const ServiciosCard = () => {

    return (
        <div>
            {
                ServiciosCard.map((servicio) => (
                    <ServiciosCard></ServiciosCard>
                ))
            }
        </div>
    )

}