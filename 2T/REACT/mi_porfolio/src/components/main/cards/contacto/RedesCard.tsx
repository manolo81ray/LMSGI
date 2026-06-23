import type { IRedSocial } from "@/model/interfaces/contacto/IRedSocial"

interface Props {
    redes: IRedSocial[]
}

const svgStyles = "w-10 h-10 md:w-12 md:h-12 xl:w-16 xl:h-16 fill-foreground stroke-foreground group-hover:fill-primary group-hover:stroke-primary transition-all duration-300"

export const RedesCard = ({ redes }: Props) => {
    if (redes.length === 0) return null

    return (
        <section className="w-full bg-background py-16 xl:py-24 px-6 lg:px-24 xl:px-32 font-sans">
            <div className="max-w-6xl xl:max-w-screen-2xl mx-auto">
                <span className="block text-primary text-xs xl:text-base font-semibold tracking-[0.14em] uppercase mb-3">
                    Encuéntrame en mis
                </span>
                <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-foreground mb-12 xl:mb-16 tracking-tight">
                    Redes Sociales
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 xl:gap-8">
                    {redes.map((red) => {
                        const svgConClases = red.icono.includes("<svg ")
                            ? red.icono.replace("<svg ", `<svg class="${svgStyles}" `)
                            : red.icono

                        return (
                            <a
                                key={red.id}
                                href={red.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center justify-center gap-6 xl:gap-8 bg-card/50 backdrop-blur-md rounded-2xl p-8 xl:p-12 border border-primary/10 shadow-lg hover:bg-card/80 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div dangerouslySetInnerHTML={{ __html: svgConClases }} />
                                <span className="text-muted-foreground text-sm xl:text-lg font-medium tracking-wide group-hover:text-primary transition-colors duration-300 uppercase">
                                    {red.nombre}
                                </span>
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
