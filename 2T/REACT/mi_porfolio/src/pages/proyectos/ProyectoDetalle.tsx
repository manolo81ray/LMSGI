import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos";
import { getProyectoId } from "@/model/api/frontend/proyectos/apiProyectos";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const ProyectoDetalle = () => {
    const { id } = useParams();

    const [proyecto, setProyecto] = useState<IProyectos | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchProyecto = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await getProyectoId(id);

                if (data) {
                    setProyecto(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProyecto();
    }, [id]);

    const formatearFecha = (fechaIso: string | Date) => {
        if (!fechaIso) return "Presente";
        const fecha = new Date(fechaIso);
        const formateado = new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" }).format(fecha);
        return formateado.charAt(0).toUpperCase() + formateado.slice(1);
    };

    // ==========================================
    // PANTALLA DE CARGA
    // ==========================================
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <span className="font-serif text-3xl text-primary italic font-light animate-pulse">
                    Cargando proyecto...
                </span>
            </div>
        );
    }

    // ==========================================
    // PANTALLA SI NO EXISTE EL PROYECTO
    // ==========================================
    if (error || !proyecto) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
                <h1 className="font-serif text-5xl text-foreground mb-6">
                    Proyecto <span className="italic text-primary">no encontrado</span>
                </h1>
                <Link
                    to="/proyectos"
                    className="text-primary font-sans text-sm font-bold tracking-[0.2em] uppercase border-b border-primary/30 pb-1 hover:border-primary transition-colors"
                >
                    ← Volver a Proyectos
                </Link>
            </div>
        );
    }

    const year = new Date(proyecto.fecha_creacion).getFullYear();

    return (
        <article className="escala-grande bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-8 md:pt-12 pb-24">

                {/* Migas de pan */}
                <Breadcrumb className="mb-10">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/proyectos">Proyectos</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{proyecto.titulo}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* ENCABEZADO */}
                <header className="mb-12 max-w-4xl">
                    <span className="block font-sans text-primary text-sm font-bold tracking-[0.25em] uppercase mb-4">
                        {proyecto.tecnologia} \ {year}
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-[1.05] tracking-tight mb-6">
                        {proyecto.titulo}
                    </h1>
                    <p className="font-sans text-muted-foreground text-lg leading-[1.7] font-light max-w-3xl">
                        {proyecto.descripcion}
                    </p>
                </header>

                {/* CUERPO: contenido principal + barra lateral */}
                <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">

                    {/* COLUMNA PRINCIPAL */}
                    <div className="flex flex-col gap-8">

                        {/* Imagen destacada */}
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-card border border-border shadow-[0_24px_48px_rgba(0,0,0,0.3)] group">
                            <img
                                src={proyecto.img_web}
                                alt={proyecto.titulo}
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326]/70 via-transparent to-transparent pointer-events-none"></div>
                        </div>

                        {/* Sobre el proyecto */}
                        <section className="bg-card border border-border rounded-xl p-6 md:p-10 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-9 h-9 rounded-md bg-primary/15 flex items-center justify-center text-primary">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                                    </svg>
                                </span>
                                <h2 className="font-serif text-2xl md:text-3xl text-foreground">Sobre el Proyecto</h2>
                            </div>

                            <p className="font-sans text-muted-foreground text-base leading-[1.8] font-light">
                                {proyecto.descripcion}
                            </p>
                        </section>

                        {/* Etiquetas / tecnologías */}
                        {proyecto.etiquetas?.length > 0 && (
                            <section className="bg-card border border-border rounded-xl p-6 md:p-10 backdrop-blur-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-9 h-9 rounded-md bg-primary/15 flex items-center justify-center text-primary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                            <line x1="7" y1="7" x2="7.01" y2="7" />
                                        </svg>
                                    </span>
                                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Tecnologías</h2>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {proyecto.etiquetas.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-border rounded-md font-sans text-xs font-semibold text-foreground tracking-wide"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* BARRA LATERAL */}
                    <aside className="flex flex-col gap-6 lg:sticky lg:top-28">

                        {/* Detalles del proyecto */}
                        <div className="bg-card border border-border rounded-xl p-6 md:p-8 backdrop-blur-md">
                            <h3 className="font-serif text-xl text-foreground mb-6 pb-4 border-b border-border">
                                Detalles del Proyecto
                            </h3>

                            <div className="flex flex-col gap-6">
                                <div>
                                    <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                                        Tecnología
                                    </span>
                                    <span className="font-sans text-base text-foreground font-medium">
                                        {proyecto.tecnologia}
                                    </span>
                                </div>

                                <div>
                                    <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                                        Fecha de creación
                                    </span>
                                    <span className="font-sans text-base text-foreground font-medium">
                                        {formatearFecha(proyecto.fecha_creacion)}
                                    </span>
                                </div>
                            </div>

                            {proyecto.url && (
                                <a
                                    href={proyecto.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 w-full bg-gradient-to-br from-primary to-[#9d7d00] text-primary-foreground font-bold text-sm px-6 py-4 rounded-md shadow-[0_12px_24px_rgba(233,195,73,0.2)] hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2.5"
                                >
                                    Visitar sitio web
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17L17 7M7 7h10v10" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
};
