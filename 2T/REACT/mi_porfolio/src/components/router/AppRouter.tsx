import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { BackLayout } from "@/components/layouts/BackLayout";
import { QSomos } from "@/pages/home/QSomos";
import { Spinner } from "@/components/ui/spinner";

// La home se carga de forma directa (eager) para que la primera visita no
// muestre el spinner. El resto de páginas se dividen en chunks independientes
// con React.lazy: así la web pública no arrastra el peso del panel de admin.
// Los componentes usan exports nombrados, por eso mapeamos a `default`.
const Formacion = lazy(() => import("@/pages/formacion/Formacion").then((m) => ({ default: m.Formacion })));
const FormacionDetalle = lazy(() => import("@/pages/formacion/FormacionDetalle").then((m) => ({ default: m.FormacionDetalle })));
const CursoDetalle = lazy(() => import("@/pages/formacion/CursoDetalle").then((m) => ({ default: m.CursoDetalle })));
const Servicios = lazy(() => import("@/pages/servicios/Servicios").then((m) => ({ default: m.Servicios })));
const ServicioDetalle = lazy(() => import("@/pages/servicios/ServicioDetalle").then((m) => ({ default: m.ServicioDetalle })));
const Proyectos = lazy(() => import("@/pages/proyectos/Proyectos").then((m) => ({ default: m.Proyectos })));
const ProyectoDetalle = lazy(() => import("@/pages/proyectos/ProyectoDetalle").then((m) => ({ default: m.ProyectoDetalle })));
const Contacto = lazy(() => import("@/pages/contacto/Contacto").then((m) => ({ default: m.Contacto })));
const Privacidad = lazy(() => import("@/pages/legal/Privacidad").then((m) => ({ default: m.Privacidad })));
const AvisoLegal = lazy(() => import("@/pages/legal/AvisoLegal").then((m) => ({ default: m.AvisoLegal })));
const Login = lazy(() => import("@/pages/auth/Login").then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard").then((m) => ({ default: m.Dashboard })));
const CursosHome = lazy(() => import("@/pages/admin/cursos/Home").then((m) => ({ default: m.CursosHome })));
const ProyectosHome = lazy(() => import("@/pages/admin/proyectos/Home").then((m) => ({ default: m.ProyectosHome })));
const ServiciosHome = lazy(() => import("@/pages/admin/servicios/Home").then((m) => ({ default: m.ServiciosHome })));
const FormacionHome = lazy(() => import("@/pages/admin/formacion/Home").then((m) => ({ default: m.FormacionHome })));
const LenguajesHome = lazy(() => import("@/pages/admin/lenguajes/Home").then((m) => ({ default: m.LenguajesHome })));
const RedesHome = lazy(() => import("@/pages/admin/redes/Home").then((m) => ({ default: m.RedesHome })));

// Fallback mientras se descarga el chunk de la ruta.
const RouteFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
    <Spinner className="size-8 text-primary" />
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
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
              <Route path="/admin/redes" element={<RedesHome />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
