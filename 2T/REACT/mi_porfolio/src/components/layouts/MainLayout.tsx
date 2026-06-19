import {Footer} from "../footer/Footer";
import NavBar from "../header/NavBar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {

    return(
        <>
            <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
                <NavBar />
                <main className="flex-1 relative z-0">
                    <Outlet />
                </main>
                <footer className="bg-background text-foreground">
                    <Footer />
                </footer>
            </div>
        </>
    )
}
