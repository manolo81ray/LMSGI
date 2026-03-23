
//varable 
//QSomos es = arrow function (este es una funcion de flecha)
//las llaves amarillas son el bloque de la funcion 
//funcion de flecha
const QSomos = () => {
// bloque de la funcion 
    return(
// la funcion devuelve lo que haya  en el codigo HTML, etc.
        <section id="qsomos" className="min-h-screen flex items-center justify-center">
            <h1>Quienes Somos</h1>
            <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
            </Card>
        </section>
    )
} 

export default QSomos;




//funcion de flecha de JS (arrow function)
//version mas moderna de JS
export const Hero1 = () =>{
    return(
        <section id="qsomos" className="min-h-screen flex items-center justify-center">
            <h1>Quienes Somos</h1>
        </section>
    )
}