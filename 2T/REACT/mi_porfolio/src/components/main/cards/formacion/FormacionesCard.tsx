import type { IFormacion } from "@/model/interfaces/formacion/IFormacion";
import { FormacionCard } from "@/components/main/cards/formacion/FormacionCard";

interface Props {
    formaciones: IFormacion[];
}

export const FormacionesCard = ({ formaciones }: Props) => {

    return (
        <>
            <section className="bg-[#131b2e] py-15 xl:py-24 px-6 lg:px-24 xl:px-32 min-h-screen">
                <div className="max-w-screen-xl xl:max-w-screen-2xl mx-auto">

                    {/* Encabezado Editorial con Línea Fantasma (Ghost Border) */}
                    <header className="mb-10 xl:mb-16">
                        <span className="block font-sans text-primary text-[90%] xl:text-base font-bold tracking-[0.2em] uppercase mb-5">
                            Formaciones
                        </span>

                        <div className="flex items-center gap-8">
                            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-foreground leading-tight md:leading-none tracking-tighter md:whitespace-nowrap border-l-2 border-[#e9c349] pl-4 xl:pl-6">
                                Titulaciones Académicas
                            </h1>
                            {/* Línea horizontal divisoria sutil que rellena el espacio restante */}
                            <div className="hidden md:block h-[1px] bg-border mt-4"></div>
                        </div>
                    </header>

                    {/* Grid - 2 columnas con espacio generoso (gap-8) */}
                    <div className="grid gap-8 xl:gap-12 md:grid-cols-2 items-start">
                        {formaciones.map((formacion) => (
                            <FormacionCard
                                key={formacion.id}
                                formacion={formacion}
                            />
                        ))}
                    </div>

                </div>
            </section>

        </>

    );
}