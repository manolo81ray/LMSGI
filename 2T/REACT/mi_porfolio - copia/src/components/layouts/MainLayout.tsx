import {Footer} from "../footer/Footer";
import NavBar from "../header/NavBar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {

    return(
        <>
            <div className="min-h-screen w-full bg-slate-900 text-white">
                
                <header className="w-full bg-slate-950/80 backdrop-blur z-50">
                    <NavBar /> 
                </header>

                <main className="pt-16">
                    {/* Es un componente dinamico, que me permite que se carge aqui el componente que yo pinche */}
                    <Outlet />
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    )
}