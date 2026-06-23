import { Link } from "react-router-dom";
import { useEffect } from "react";

interface Props {
    /** Título principal (H1) de la página legal */
    titulo: string;
    /** Texto atenuado bajo el título, ej. "Última actualización: Junio, 2026" */
    actualizacion: string;
    /** Cuerpo central de la página */
    children: React.ReactNode;
}

/**
 * Envoltorio común para las páginas legales (Política de Privacidad y Aviso Legal).
 * Aporta la zona superior de navegación ("← Volver al Porfolio"), la cabecera con
 * título + subtítulo + línea dorada, y una columna central cómoda de leer.
 */
export const LegalPage = ({ titulo, actualizacion, children }: Props) => {
    // Al entrar en una página legal arrancamos siempre desde arriba.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#0b1326] via-[#0d1932] to-[#101d3c] text-foreground font-sans">

            {/* Capa decorativa de fondo: halos dorados y azulados muy sutiles */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                {/* Halo dorado superior */}
                <div className="absolute -top-40 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
                {/* Halo azulado a la derecha */}
                <div className="absolute top-1/3 -right-32 h-90 w-90 rounded-full bg-sky-400/10 blur-[120px]" />
                {/* Resplandor inferior */}
                <div className="absolute -bottom-40 -left-24 h-100 w-100 rounded-full bg-primary/5 blur-[120px]" />
                {/* Rejilla tenue para dar textura */}
                <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#e4e7f0_1px,transparent_1px),linear-gradient(to_bottom,#e4e7f0_1px,transparent_1px)] [bg-size:48px_48px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            </div>

            {/* 🔝 Zona superior: enlace para volver al porfolio */}
            <div className="w-full px-6 sm:px-10 lg:px-16 pt-8">
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground no-underline transition-colors hover:text-primary"
                >
                    <span aria-hidden className="text-base transition-transform duration-200 group-hover:-translate-x-1">
                        ←
                    </span>
                    Volver al Porfolio
                </Link>
            </div>

            {/* 📄 Cabecera */}
            <header className="mx-auto max-w-3xl px-6 pt-12 pb-6">
                <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    {titulo}
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    {actualizacion}
                </p>
                {/* Línea fina dorada que separa la cabecera del contenido */}
                <div className="mt-6 h-px w-full bg-linear-to-r from-primary via-primary/40 to-transparent" />
            </header>

            {/* 📝 Cuerpo central en columna limpia */}
            <article className="mx-auto max-w-3xl px-6 pb-24">
                {children}
            </article>
        </main>
    );
};

/* ----------------------------------------------------------------------------
 * Pequeños componentes de presentación reutilizables para redactar el contenido
 * legal con un estilo coherente en ambas páginas.
 * -------------------------------------------------------------------------- */

/** Párrafo de cuerpo */
export const P = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[15px] leading-relaxed text-muted-foreground mb-4">{children}</p>
);

/** Título de sección (H2) */
export const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">{children}</h2>
);

/** Lista con viñetas doradas */
export const UL = ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-4 space-y-2 pl-5 list-disc marker:text-primary text-[15px] leading-relaxed text-muted-foreground">
        {children}
    </ul>
);

/** Texto destacado dentro del cuerpo */
export const Strong = ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
);

/** Caja de "Nota de transparencia" (blockquote destacado) */
export const Nota = ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-6 rounded-r-md border-l-4 border-primary bg-card/60 px-5 py-4 text-[15px] leading-relaxed text-muted-foreground">
        {children}
    </blockquote>
);
