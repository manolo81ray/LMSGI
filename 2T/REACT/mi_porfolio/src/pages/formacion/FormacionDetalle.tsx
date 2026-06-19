import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { IFormacion } from "@/model/interfaces/formacion/IFormacion";
import { getFormacionId } from "@/model/api/frontend/formacion/apiFormacion";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const FormacionDetalle = () => {
    const { id } = useParams();

    const [formacion, setFormacion] = useState<IFormacion | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchFormacion = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await getFormacionId(id);

                if (data) {
                    setFormacion(data);
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

        fetchFormacion();
    }, [id]);

    const formatearFecha = (fechaIso: string) => {
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
                    Cargando formación...
                </span>
            </div>
        );
    }

    // ==========================================
    // PANTALLA SI NO EXISTE LA FORMACIÓN
    // ==========================================
    if (error || !formacion) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
                <h1 className="font-serif text-5xl text-foreground mb-6">
                    Formación <span className="italic text-primary">no encontrada</span>
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

    const enCurso = !formacion.fecha_fin;

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
                                <Link to="/formacion">Formación</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{formacion.nombre}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* ENCABEZADO */}
                <header className="mb-12">
                    <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
                        {/* Texto */}
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
                                    {formacion.nombre}
                                </h1>
                                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-primary text-[11px] font-bold tracking-[0.15em] uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    {enCurso ? "En Curso" : "Completada"}
                                </span>
                            </div>
                            <p className="font-sans text-muted-foreground text-lg leading-[1.7] font-light max-w-3xl">
                                {formacion.descripcion}
                            </p>
                        </div>

                        {/* Imagen destacada (arriba a la derecha) */}
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-card border border-border shadow-[0_24px_48px_rgba(0,0,0,0.3)] group">
                            <img
                                src={formacion.imagen}
                                alt={formacion.institucion}
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326]/70 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </header>

                {/* CUERPO: contenido principal + barra lateral */}
                <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">

                    {/* COLUMNA PRINCIPAL */}
                    <div className="flex flex-col gap-8">

                        {/* Sobre el programa */}
                        <section className="bg-card border border-border rounded-xl p-6 md:p-10 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-9 h-9 rounded-md bg-primary/15 flex items-center justify-center text-primary">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                </span>
                                <h2 className="font-serif text-2xl md:text-3xl text-foreground">Sobre el Programa</h2>
                            </div>

                            <p className="font-sans text-muted-foreground text-base leading-[1.8] font-light mb-8">
                                {formacion.descripcion}
                            </p>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-muted-foreground text-base leading-[1.6]">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                    Impartido en <span className="text-foreground font-medium">&nbsp;{formacion.institucion}</span>.
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground text-base leading-[1.6]">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                    Modalidad / categoría: <span className="text-foreground font-medium">&nbsp;{formacion.tipo}</span>.
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground text-base leading-[1.6]">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                    Periodo: <span className="text-foreground font-medium">&nbsp;{formatearFecha(formacion.fecha_inicio)} — {formatearFecha(formacion.fecha_fin)}</span>.
                                </li>
                            </ul>
                        </section>

                        {/* Áreas / etiquetas */}
                        <section className="bg-card border border-border rounded-xl p-6 md:p-10 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-9 h-9 rounded-md bg-primary/15 flex items-center justify-center text-primary">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                                    </svg>
                                </span>
                                <h2 className="font-serif text-2xl md:text-3xl text-foreground">Datos Clave</h2>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {[formacion.tipo, formacion.institucion, formacion.lugar_institucion]
                                    .filter(Boolean)
                                    .map((tag, index) => (
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
                    </div>

                    {/* BARRA LATERAL */}
                    <aside className="flex flex-col gap-6 lg:sticky lg:top-28">

                        {/* Detalles de la formación */}
                        <div className="bg-card border border-border rounded-xl p-6 md:p-8 backdrop-blur-md">
                            <h3 className="font-serif text-xl text-foreground mb-6 pb-4 border-b border-border">
                                Detalles de la Formación
                            </h3>

                            <div className="flex flex-col gap-6">
                                <div>
                                    <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                                        Institución
                                    </span>
                                    <span className="flex items-center gap-2 font-sans text-base text-foreground font-medium">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
                                        </svg>
                                        {formacion.institucion}
                                    </span>
                                </div>

                                <div>
                                    <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                                        Tipo
                                    </span>
                                    <span className="font-sans text-base text-foreground font-medium">
                                        {formacion.tipo}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                                            Inicio
                                        </span>
                                        <span className="font-sans text-base text-foreground font-medium">
                                            {formatearFecha(formacion.fecha_inicio)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                                            Finalización
                                        </span>
                                        <span className="font-sans text-base text-foreground font-medium">
                                            {formatearFecha(formacion.fecha_fin)}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                                        Ubicación
                                    </span>
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground/5 border border-border rounded-md font-sans text-xs text-muted-foreground tracking-wide">
                                        {formacion.lugar_institucion}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to="/contacto"
                                className="mt-8 w-full bg-gradient-to-br from-primary to-[#9d7d00] text-primary-foreground font-bold text-sm px-6 py-4 rounded-md shadow-[0_12px_24px_rgba(233,195,73,0.2)] hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-3"
                            >
                                Contáctame
                                <span>→</span>
                            </Link>
                        </div>

                        {/* Tarjeta secundaria: titulación verificada */}
                        <div className="relative overflow-hidden bg-card border border-border rounded-xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_32px_0_rgba(233,195,73,0.06)]">
                            <span className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center text-primary mb-5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="M9 12l2 2 4-4" />
                                </svg>
                            </span>
                            <h3 className="font-serif text-xl text-foreground mb-2 leading-snug">
                                Titulación Verificada
                            </h3>
                            <p className="font-sans text-muted-foreground text-sm leading-[1.6] font-light">
                                Formación {enCurso ? "actualmente en curso" : "finalizada"} y reconocida por {formacion.institucion}.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
};
