import type { IFormacion } from "@/model/interfaces/formacion/IFormacion";
import { FormacionCard } from "@/components/main/cards/formacion/FormacionCard";

interface Props {
    formaciones: IFormacion[];
}

export const FormacionesCard = ({ formaciones }: Props) => {

    return (
        <>
            <section className="bg-[#0b152e] py-15 px-6 lg:px-24 min-h-screen">
                <div className="max-w-screen-xl mx-auto">
                    
                    {/* Encabezado Editorial con Línea Fantasma (Ghost Border) */}
                    <header className="mb-10">
                        <span className="block font-sans text-[#e9c349] text-[90%] font-bold tracking-[0.2em] uppercase mb-5">
                            Formaciones
                        </span>
                        
                        <div className="flex items-center gap-8">
                            <h1 className="font-serif text-5xl md:text-6xl text-[#e4e7f0] leading-none tracking-tighter whitespace-nowrap">
                                Titulaciones Académicas
                            </h1>
                            {/* Línea horizontal divisoria sutil que rellena el espacio restante */}
                            <div className="hidden md:block  h-[1px] bg-[#e4e7f0]/10 mt-4"></div>
                        </div>
                    </header>

                    {/* Grid - 2 columnas con espacio generoso (gap-8) */}
                    <div className="grid gap-8 md:grid-cols-2 items-start">
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