import { Link } from "react-router-dom";
import logo from "@/assets/logo_mrg.png";

const navegacion = [
    { name: "Sobre mí", href: "/qsomos" },
    { name: "Formación", href: "/formacion" },
    { name: "Servicios", href: "/servicios" },
    { name: "Proyectos", href: "/proyectos" },
];

const redes = [
    {
        name: "GitHub",
        href: "https://github.com/manolo81ray",
        icon: (
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
        ),
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com",
        icon: (
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34v-7.2H6v7.2h2.34zM7.17 10.1a1.36 1.36 0 1 0 0-2.72 1.36 1.36 0 0 0 0 2.72zm11.17 8.24v-3.95c0-2.11-.45-3.74-2.92-3.74-1.19 0-1.98.65-2.31 1.27h-.03v-1.07h-2.25v7.2h2.34v-3.56c0-.94.18-1.85 1.34-1.85 1.15 0 1.16 1.08 1.16 1.91v3.5h2.34z" />
        ),
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com",
        icon: (
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.18.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.18-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36zm5.5-.43a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0z" />
        ),
    },
];

// Subrayado animado que recorre todo el contenido del enlace al pasar el ratón.
// El color de la línea se inyecta con `lineColor` para dar variedad cromática.
const enlaceConLinea =
    "relative inline-flex items-center gap-2.5 text-sm xl:text-xl text-muted-foreground no-underline transition-colors duration-200 " +
    "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 " +
    "after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-foreground";

export const Footer = () => {
    const año = new Date().getFullYear();

    return (
        <div className="w-full bg-linear-to-br from-[#0a0f1d] via-[#0c1226] to-[#0f1730] text-foreground border-t-2 border-primary/70">
            <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-14 xl:py-21">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-x-16 xl:gap-x-24 xl:gap-y-12">

                    {/* Columna de marca */}
                    <div className="flex flex-col gap-4">
                        <Link to="/qsomos" className="flex items-center gap-3 no-underline w-fit group">
                            <img src={logo} alt="Logo MRG" className="h-9 xl:h-14 w-auto transition-transform duration-200 group-hover:scale-105" />
                            <span className="font-serif italic text-lg xl:text-[1.7rem] font-bold text-primary tracking-tight">
                                Manolo R.G.
                            </span>
                        </Link>
                        <p className="text-sm xl:text-xl leading-relaxed text-muted-foreground">
                            Creamos experiencias digitales con pasión y atención al detalle.
                        </p>
                    </div>

                    {/* Navegación */}
                    <nav aria-label="Navegación del pie de página">
                        <h3 className="flex items-center gap-2 text-xs xl:text-lg font-semibold uppercase tracking-[0.14em] text-foreground mb-4">
                            <span className="h-3.5 w-1 xl:h-5 xl:w-1.5 rounded-full bg-primary" />
                            Navegación
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {navegacion.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.href} className={`${enlaceConLinea} after:bg-primary/70`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contacto */}
                    <div>
                        <h3 className="flex items-center gap-2 text-xs xl:text-lg font-semibold uppercase tracking-[0.14em] text-foreground mb-4">
                            <span className="h-3.5 w-1 xl:h-5 xl:w-1.5 rounded-full bg-primary" />
                            Contacto
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a href="mailto:mrg06eoi@gmail.com" className={`${enlaceConLinea} after:bg-sky-300/70`}>
                                    <svg className="w-4 h-4 xl:w-6 xl:h-6 shrink-0 fill-sky-300/80" viewBox="0 0 24 24">
                                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                    mrg06eoi@gmail.com
                                </a>
                            </li>
                            <li>
                                <Link to="/contacto#ubicacion" className={`${enlaceConLinea} after:bg-emerald-300/70`}>
                                    <svg className="w-4 h-4 xl:w-6 xl:h-6 shrink-0 fill-emerald-300/80" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                                    </svg>
                                    Almería, España
                                </Link>
                            </li>
                        </ul>

                        {/* Redes sociales: los iconos se vuelven dorados al pasar el ratón */}
                        <div className="flex gap-3 mt-5">
                            {redes.map((red) => (
                                <a
                                    key={red.name}
                                    href={red.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={red.name}
                                    className="w-9 h-9 xl:w-14 xl:h-14 flex items-center justify-center rounded-lg xl:rounded-xl bg-secondary text-muted-foreground hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <svg className="w-4.5 h-4.5xl:w-7 xl:h-7 fill-current" viewBox="0 0 24 24">
                                        {red.icon}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* CTA ¿Hablamos? */}
                    <div className="flex flex-col gap-4">
                        <h3 className="flex items-center gap-2 text-xs xl:text-lg font-semibold uppercase tracking-[0.14em] text-foreground">
                            <span className="h-3.5 w-1 xl:h-5 xl:w-1.5 rounded-full bg-primary" />
                            ¿Hablamos?
                        </h3>
                        <p className="text-sm xl:text-xl leading-relaxed text-muted-foreground">
                            ¿Tienes un proyecto en mente? Cuéntame y veamos cómo puedo ayudarte.
                        </p>
                        <Link
                            to="/contacto"
                            className="inline-flex items-center gap-2 w-fit px-5 py-2.5 xl:px-7 xl:py-3.5 bg-linear-to-br from-primary to-[#9d7d00] text-primary-foreground text-sm xl:text-xl font-semibold rounded-md transition-all duration-200 hover:opacity-90 hover:-translate-y-px no-underline"
                        >
                            Contáctame
                            <svg className="w-4 h-4 xl:w-6 xl:h-6" viewBox="0 0 24 24">
                                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Barra inferior */}
            <div className="border-t border-border">
                <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-5 xl:py-8 flex flex-col sm:flex-row items-center justify-between gap-3 xl:gap-4">
                    <p className="text-xs xl:text-lg text-muted-foreground">
                        © {año} Portfolio Personal Manolo R.G. - Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-5 text-xs">
                        <Link to="/privacidad" className={`${enlaceConLinea} text-xs after:bg-primary/60`}>Privacidad</Link>
                        <Link to="/aviso-legal" className={`${enlaceConLinea} text-xs after:bg-sky-300/70`}>Aviso legal</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
