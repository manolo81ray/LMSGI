import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Contacto } from "@/pages/contacto/Contacto";
import { QSomos } from "@/pages/home/QSomos";
import { Formacion } from "@/pages/formacion/Formacion";
import { Servicios } from "@/pages/servicios/Servicios";
import { ServicioDetalle } from "@/pages/servicios/ServicioDetalle";
import { Proyectos } from "@/pages/proyectos/Proyectos";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* OUTLET MAINLAYOUT */}
        <Route element={<MainLayout />}>
          {/* Los OUTLETS son cajas dinamicas donde se carga el contenido.
                Aqui nos indica en que Outlet se va a cargar, en este caso seria en el Outlet del MainLayout*/}
          <Route path="/" element={<QSomos />} />
          <Route path="/qsomos" element={<QSomos />} />
          <Route path="/formacion" element={<Formacion />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:id" element={<ServicioDetalle />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
