import { Outlet } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";

export const MainLayout = () => {
    return (
        <>
            <Header>
                <NavBar></NavBar>
            </Header>
            
            <Main>
                {/* El componente Outlet es un componente de React Router que se utiliza  */}
                <Outlet></Outlet>
            </Main>

            <Footer>
                Este es el pie de pagina de mi porfolio
            </Footer>
        </>
    )
}

