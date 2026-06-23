import type { ICursos } from "@/model/interfaces/formacion/ICursos";
import { CursoCard } from "@/components/main/cards/formacion/CursoCard";

interface Props {
    cursos: ICursos[];
}

export const CursosCard = ({ cursos }: Props) => {

    return (
        <section className="bg-background py-16 px-6 lg:px-24 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Encabezado Editorial (Centrado según la imagen) */}
                <header className="mb-16 md:mb-16 text-center flex flex-col items-center">
                    <span className="block font-sans text-primary text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4">
                        02 / Technical Mastery
                    </span>

                    <h1 className="font-serif text-5xl md:text-6xl text-foreground leading-none tracking-tighter italic font-light">
                        Cursos y Certificaciones
                    </h1>
                </header>

                {/* Grid - 3 columnas en escritorio como en el diseño de referencia */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {cursos.map((curso) => (
                        <CursoCard
                            key={curso.id}
                            curso={curso}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}