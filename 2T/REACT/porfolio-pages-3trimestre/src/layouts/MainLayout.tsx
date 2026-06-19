import NavBar from "../components/main/NavBar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {

    return(
        <>
            <div className="min-h-screen w-full bg-slate-900 text-white">
                
                <header className="w-full bg-slate-950/80 backdrop-blur z-50">
                    <NavBar /> 
                </header>

                <main>
                    {/* Es un componente dinamico, que me permite que se carge aqui el componente que yo pinche */}
                    <Outlet />
                </main>

                <footer>
                    Este es el footer de mi porfolio
                </footer>
            </div>
        </>
    )
}