import { Link } from "react-router-dom"

function navBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/trabajos">Trabajos</Link>
            <Link to="/contacto">Contacto</Link>
        </nav>
    )
}

export default navBar