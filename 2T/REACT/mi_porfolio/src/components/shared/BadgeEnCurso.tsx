type Variante = "en-curso" | "completado";

interface Props {
    /** Estado a mostrar. "en-curso" (azul, pulsante) o "completado" (dorado). */
    variante?: Variante;
    /** Texto a mostrar. Por defecto depende de la variante. */
    texto?: string;
    /** Tamaño del badge. "sm" por defecto, "lg" para destacarlo más. */
    size?: "sm" | "lg";
    /** Clases extra opcionales para ajustar el contenedor desde la tarjeta. */
    className?: string;
}

// Estilos por tamaño: pill (padding + texto) y diámetro del punto.
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

// Estilos por variante: colores de la pastilla, color del punto, texto por
// defecto y si el punto parpadea (solo "en curso", porque sigue activo).
const VARIANTES = {
    "en-curso": {
        pill: "border-[#85B7EB] bg-[#E6F1FB] text-[#0C447C]",
        dot: "bg-[#185FA5] animate-pulse",
        texto: "En curso",
    },
    completado: {
        pill: "border-[#EF9F27] bg-[#FAEEDA] text-[#633806]",
        dot: "bg-[#854F0B]",
        texto: "Completado",
    },
} as const;

/**
 * Badge de estado reutilizable: "En curso" (azul pulsante) o "Completado"
 * (dorado). El estado real se controla desde el panel admin (columna en_curso).
 *
 * Se coloca como primer hijo dentro de cualquier tarjeta. NO usa position
 * relative/absolute: se alinea arriba a la izquierda con flexbox puro, por lo
 * que es totalmente responsive y no se solapa con el contenido.
 *
 * Uso:
 *   <BadgeEnCurso />                          // azul "En curso"
 *   <BadgeEnCurso variante="completado" />    // dorado "Completado"
 *   <BadgeEnCurso size="lg" />                // versión más grande
 */
export const BadgeEnCurso = ({ variante = "en-curso", texto, size = "sm", className = "" }: Props) => {
    const estilo = SIZES[size];
    const v = VARIANTES[variante];

    return (
        <div className={`flex w-full justify-start ${className}`}>
            <span className={`inline-flex items-center rounded-full border font-medium ${v.pill} ${estilo.pill}`}>
                <span className={`rounded-full ${v.dot} ${estilo.dot}`} />
                {texto ?? v.texto}
            </span>
        </div>
    );
};
