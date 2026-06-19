import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface Props {
    /** Texto que se muestra junto al spinner (cambia según la sección) */
    texto?: string
    /** Si es true ocupa toda la pantalla; si es false se ajusta a su contenedor (ej. tablas del admin) */
    fullScreen?: boolean
}

export const LoadingDatos = ({ texto = "Cargando Datos de Supabase", fullScreen = true }: Props) => {
    return (
        <div
            className={cn(
                "flex w-full flex-row items-center justify-center gap-6",
                fullScreen ? "min-h-screen bg-background" : "min-h-[300px]"
            )}
        >
            <Spinner className="size-20 text-primary" />
            <p className="font-serif text-2xl md:text-3xl italic font-light text-primary animate-pulse">
                {texto}
            </p>
        </div>
    )
}
