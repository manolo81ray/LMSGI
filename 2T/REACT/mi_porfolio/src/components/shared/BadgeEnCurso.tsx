interface Props {
    /** Texto a mostrar. Por defecto "En curso". */
    texto?: string;
    /** Tamaño del badge. "sm" por defecto, "lg" para destacarlo más. */
    size?: "sm" | "lg";
    /** Clases extra opcionales para ajustar el contenedor desde la tarjeta. */
    className?: string;
}

// Estilos por tamaño: pill (padding + texto) y diámetro del punto pulsante.
const SIZES = {
    sm: {
        pill: "gap-1.5 px-2.5 py-1 text-[11px]",
        dot: "h-[7px] w-[7px]",
    },
    lg: {
        pill: "gap-2.5 px-4 py-2 text-base",
        dot: "h-2.5 w-2.5",
    },
} as const;

/**
 * Badge "En curso" reutilizable.
 *
 * Se coloca como primer hijo dentro de cualquier tarjeta. NO usa position
 * relative/absolute: se alinea arriba a la izquierda con flexbox puro, por lo
 * que es totalmente responsive y no se solapa con el contenido.
 *
 * Uso:
 *   <BadgeEnCurso />               // muestra el badge a la izquierda
 *   <BadgeEnCurso size="lg" />     // versión más grande
 *   <BadgeEnCurso texto="Activo" />
 */
export const BadgeEnCurso = ({ texto = "En curso", size = "sm", className = "" }: Props) => {
    const estilo = SIZES[size];

    return (
        <div className={`flex w-full justify-start ${className}`}>
            <span className={`inline-flex items-center rounded-full border border-[#85B7EB] bg-[#E6F1FB] font-medium text-[#0C447C] ${estilo.pill}`}>
                <span className={`rounded-full bg-[#185FA5] animate-pulse ${estilo.dot}`} />
                {texto}
            </span>
        </div>
    );
};
