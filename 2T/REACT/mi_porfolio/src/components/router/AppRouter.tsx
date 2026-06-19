import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Contacto } from "@/pages/contacto/Contacto";
import { QSomos } from "@/pages/home/QSomos";
import { Formacion } from "@/pages/formacion/Formacion";
import { FormacionDetalle } from "@/pages/formacion/FormacionDetalle";
import { CursoDetalle } from "@/pages/formacion/CursoDetalle";
import { Servicios } from "@/pages/servicios/Servicios";
import { ServicioDetalle } from "@/pages/servicios/ServicioDetalle";
import { Proyectos } from "@/pages/proyectos/Proyectos";
import { ProyectoDetalle } from "@/pages/proyectos/ProyectoDetalle";
import { Privacidad } from "@/pages/legal/Privacidad";
import { AvisoLegal } from "@/pages/legal/AvisoLegal";
import { Login } from "@/pages/auth/Login";
import { BackLayout } from "@/layouts/backend/BackLayout";
import { Dashboard } from "@/pages/admin/Dashboard";
import { CursosHome } from "@/pages/admin/cursos/Home";
import { ProyectosHome } from "@/pages/admin/proyectos/Home";
import { ServiciosHome } from "@/pages/admin/servicios/Home";
import { FormacionHome } from "@/pages/admin/formacion/Home";
import { LenguajesHome } from "@/pages/admin/lenguajes/Home";

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
          <Route path="/formacion/:id" element={<FormacionDetalle />} />
          <Route path="/curso/:id" element={<CursoDetalle />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:id" element={<ServicioDetalle />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        {/* Páginas legales: rutas limpias fuera del MainLayout (sin NavBar/Footer) */}
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />

        {/* Acceso al backend: fuera del layout público (sin NavBar/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<BackLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/cursos" element={<CursosHome />} />
            <Route path="/admin/proyectos" element={<ProyectosHome />} />
            <Route path="/admin/servicios" element={<ServiciosHome />} />
            <Route path="/admin/formacion" element={<FormacionHome />} />
            <Route path="/admin/lenguajes" element={<LenguajesHome />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
