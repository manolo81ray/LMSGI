import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { ICursos } from "@/model/interfaces/formacion/ICursos";
import { getCursoId } from "@/model/api/frontend/formacion/apiCursos";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BadgeEnCurso } from "@/components/shared/BadgeEnCurso";

export const CursoDetalle = () => {
    const { id } = useParams();

    const [curso, setCurso] = useState<ICursos | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchCurso = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await getCursoId(id);

                if (data) {
                    setCurso(data);
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

        fetchCurso();
    }, [id]);

    const formatearFecha = (fechaIso: string | Date) => {
        if (!fechaIso) return "Presente";
        const fecha = new Date(fechaIso);
        const formateado = new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" }).format(fecha);
        return formateado.charAt(0).toUpperCase() + formateado.slice(1);
    };

    const getColorPlataforma = (plataforma: string = "") => {
        const nombre = plataforma.toLowerCase();
        if (nombre.includes("udemy")) return "bg-[#ec5252]";
        if (nombre.includes("aws") || nombre.includes("amazon")) return "bg-[#ff9900]";
        if (nombre.includes("coursera")) return "bg-[#2a73cc]";
        return "bg-primary";
    };

    // ==========================================
    // PANTALLA DE CARGA
    // ==========================================
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <span className="font-serif text-3xl text-primary italic font-light animate-pulse">
                    Cargando curso...
                </span>
            </div>
        );
    }

    // ==========================================
    // PANTALLA SI NO EXISTE EL CURSO
    // ==========================================
    if (error || !curso) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                    Curso <span className="italic text-primary">no encontrado</span>
                </h1>
                <Link
                    to="/formacion"
                    className="text-primary font-sans text-sm font-bold tracking-[0.2em] uppercase border-b border-primary/30 pb-1 hover:border-primary transition-colors"
                >
                    ← Volver a Formación
                </Link>
            </div>
        );
    }

    // Separamos la descripción en párrafos (por saltos de línea)
    const parrafos = (curso.descripcion || "")
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <article className="escala-grande bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
            <div className="max-w-screen-xl mx-auto px-5 sm:px-6 lg:px-12 pt-8 md:pt-12 pb-20 md:pb-24">

                {/* Migas de pan */}
                <Breadcrumb className="mb-8 md:mb-12">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/formacion">Formación</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{curso.titulo}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* CUERPO: contenido principal + barra lateral */}
                <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_380px] lg:gap-16 lg:items-start">

                    {/* COLUMNA PRINCIPAL */}
                    <div className="flex flex-col">

                        {/* Badge de estado (En curso / Completado), controlado desde el admin */}
                        <BadgeEnCurso className="mb-4" variante={curso.en_curso ? "en-curso" : "completado"} />

                        {/* Título con degradado dorado */}
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight bg-gradient-to-br from-[#ffe088] via-[#e9c349] to-[#9d7d00] bg-clip-text text-transparent">
                            {curso.titulo}
                        </h1>

                        {/* Subtítulo / partner */}
                        {curso.impartido && (
                            <p className="mt-3 font-sans text-base md:text-lg text-muted-foreground font-light">
                                {curso.impartido}
                            </p>
                        )}

                        {/* Acerca de la certificación */}
                        <section className="mt-10 md:mt-14">
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="font-serif text-xl md:text-2xl text-foreground whitespace-nowrap">
                                    Acerca de la certificación
                                </h2>
                                <span className="h-px flex-1 bg-border"></span>
                            </div>

                            <div className="flex flex-col gap-4">
                                {parrafos.length > 0 ? (
                                    parrafos.map((parrafo, index) => (
                                        <p
                                            key={index}
                                            className="font-sans text-muted-foreground text-base md:text-lg leading-[1.8] font-light"
                                        >
                                            {parrafo}
                                        </p>
                                    ))
                                ) : (
                                    <p className="font-sans text-muted-foreground text-base leading-[1.8] font-light">
                                        Sin descripción disponible.
                                    </p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* BARRA LATERAL */}
                    <aside className="flex flex-col gap-6 lg:sticky lg:top-28">

                        {/* Tarjeta de imagen / credencial con borde dorado y glow */}
                        {curso.imagen && (
                            <div className="relative w-full rounded-xl overflow-hidden border border-primary/30 bg-card shadow-[0_0_40px_-8px_rgba(233,195,73,0.35)]">
                                <img
                                    src={curso.imagen}
                                    alt={curso.titulo}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-xl pointer-events-none"></div>
                            </div>
                        )}

                        {/* Panel de metadatos */}
                        <div className="flex flex-col gap-6">

                            {/* Fecha de obtención */}
                            <div>
                                <span className="block font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1.5">
                                    Fecha de obtención:
                                </span>
                                <span className="font-sans text-lg text-foreground font-semibold">
                                    {formatearFecha(curso.fecha)}
                                </span>
                            </div>

                            {/* Plataforma */}
                            <div>
                                <span className="block font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
                                    Plataforma:
                                </span>
                                <span className="inline-flex items-center gap-2.5 font-sans text-base text-foreground font-medium">
                                    <span className={`w-2.5 h-2.5 rounded-full ${getColorPlataforma(curso.plataforma)} shadow-sm`}></span>
                                    {curso.plataforma}
                                </span>
                            </div>

                            {/* Habilidades */}
                            {curso.etiquetas?.length > 0 && (
                                <div>
                                    <span className="block font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-3">
                                        Habilidades:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {curso.etiquetas.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3.5 py-1.5 bg-foreground/5 border border-border rounded-full font-sans text-xs font-medium text-foreground tracking-wide"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
};
