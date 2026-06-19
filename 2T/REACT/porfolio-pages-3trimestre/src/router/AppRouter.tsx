import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Trabajos } from "../pages/Trabajos";
import { Contacto } from "../pages/Contacto";
import { QSomos } from "../pages/QSomos";
import { Formacion } from "../pages/Formacion";
import { Servicios } from "../pages/servicios/Servicios";
import { ServicioDetalle } from "../pages/servicios/ServicioDetalle";
import {BackLayout} from "@/layouts/backend/BackLayout";
import { AdminCursos } from "@/pages/admin/cursos/Home";
import { AdminServicios } from "@/pages/admin/servicios/Home";
import { AdminTrabajos } from "@/pages/admin/trabajos/Home";
import { AdminDashboard } from "@/pages/admin/Dashboard";

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
          <Route path="/trabajos" element={<Trabajos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
        
        <Route path="/admin" element={<BackLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/cursos" element={<AdminCursos />} />
          <Route path="/admin/servicios" element={<AdminServicios />} />
          <Route path="/admin/trabajos" element={<AdminTrabajos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
