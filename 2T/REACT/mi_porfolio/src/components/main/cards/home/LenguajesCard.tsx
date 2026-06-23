import { Fragment } from "react";
import type { ILenguajes } from "@/model/interfaces/home/ILenguajes";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface Props {
    lenguajes: ILenguajes[];
}

export const LenguajesCard = ({ lenguajes }: Props) => {

    const skills = [
        { nombre: "Ingeniería de Software", porcentaje: 95 },
        { nombre: "Arquitectura web", porcentaje: 88 },
        { nombre: "Infraestructura en la nube", porcentaje: 75 },
    ];

    return (
        <section className="bg-[#151e37] py-24 xl:py-32 px-6 lg:px-24 xl:px-32 min-h-screen flex items-center">
            <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 xl:gap-28 items-center">

                {/* COLUMNA IZQUIERDA: Textos y Barras */}
                <div className="lg:col-span-5 flex flex-col justify-center">

                    {/* Título (Editorial Anchor) */}
                    <h2 className="font-serif text-5xl md:text-6xl xl:text-7xl text-foreground leading-tight tracking-tight mb-6 xl:mb-8 border-l-2 border-[#e9c349] pl-4 xl:pl-6">
                        Lenguajes Aprendidos
                    </h2>

                    {/* Descripción */}
                    <p className="font-sans text-muted-foreground text-lg xl:text-2xl leading-[1.8] font-light mb-12 xl:mb-16 max-w-lg xl:max-w-xl">
                        Una cuidada selección de herramientas elegidas por su fiabilidad,
                        rendimiento y experiencia de desarrollador. Mi conjunto de herramientas está optimizado
                        para la excelencia web moderna y como futuro tecnico de ASIR.
                    </p>

                    {/* Barras de Progreso */}
                    <div className="flex flex-col gap-8 xl:gap-10">
                        {skills.map((skill, index) => (
                            <div key={index} className="w-full">
                                {/* Textos de la barra */}
                                <div className="flex justify-between items-end mb-3">
                                    <span className="font-sans text-sm xl:text-lg font-bold tracking-wide text-foreground">
                                        {skill.nombre}
                                    </span>
                                    <span className="font-sans text-sm xl:text-lg font-medium text-primary">
                                        {skill.porcentaje}%
                                    </span>
                                </div>

                                {/* Track y Relleno de la barra (Sovereign Style) */}
                                <div className="w-full h-0.75 bg-card rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-primary to-[#9d7d00] rounded-full relative"
                                        style={{ width: `${skill.porcentaje}%` }}
                                    >
                                        {/* Brillo en la punta de la barra */}
                                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLUMNA DERECHA: Tabs de Tecnologías */}
                <div className="lg:col-span-7">
                    {lenguajes.length > 0 && (
                        <Tabs
                            defaultValue={String(lenguajes[0].id_lenguaje)}
                            className="w-full"
                        >
                            {/* Lista de pestañas: cada tecnología separada por "~", en fila */}
                            <TabsList className="w-full flex-row flex-wrap items-center h-auto bg-transparent p-0 gap-3 xl:gap-4">
                                {lenguajes.map((lenguaje, index) => (
                                    <Fragment key={lenguaje.id_lenguaje}>
                                        <TabsTrigger
                                            value={String(lenguaje.id_lenguaje)}
                                            className="w-auto flex-none rounded-full border border-[#e9c349]/30 bg-card/40 px-5 py-2 xl:px-7 xl:py-3 text-lg md:text-xl xl:text-2xl font-bold text-[#e9c349] dark:text-[#e9c349] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e9c349]/60 hover:bg-[#e9c349]/10 data-[state=active]:border-[#e9c349] dark:data-[state=active]:border-[#e9c349] data-[state=active]:bg-[#e9c349]/15 data-[state=active]:text-[#e9c349] dark:data-[state=active]:text-[#e9c349] data-[state=active]:shadow-[0_0_20px_rgba(233,195,73,0.25)]"
                                        >
                                            {lenguaje.nombre}
                                        </TabsTrigger>
                                        {index < lenguajes.length - 1 && (
                                            <span
                                                aria-hidden="true"
                                                className="text-white text-2xl xl:text-3xl font-light select-none"
                                            >
                                                ~
                                            </span>
                                        )}
                                    </Fragment>
                                ))}
                            </TabsList>

                            {/* Contenido de cada pestaña: solo la imagen, ajustada a su tamaño */}
                            {lenguajes.map((lenguaje) => (
                                <TabsContent
                                    key={lenguaje.id_lenguaje}
                                    value={String(lenguaje.id_lenguaje)}
                                    className="flex justify-center mt-8"
                                >
                                    <Card className="w-fit max-w-62.5 xl:max-w-90 p-0">
                                        <CardContent className="p-0">
                                            <img
                                                src={lenguaje.logo}
                                                alt={`Logo de ${lenguaje.nombre}`}
                                                className="block max-w-full h-auto object-contain"
                                            />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                    )}
                </div>

            </div>
        </section>
    );
}