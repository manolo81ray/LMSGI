

export const Intro = () => {
    return (
        <section className="bg-background py-10 pb-16 xl:py-16 xl:pb-24 mx-auto px-10 xl:px-16  flex  items-center justify-between">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-14 items-stretch">

                    {/* Article 1 — Info */}
                    <article className="flex flex-col gap-6">

                        {/* Encabezado */}
                        <span className="text-primary text-xs xl:text-base font-semibold tracking-[0.14em] uppercase">
                            Ponte en contacto
                        </span>

                        {/* Título */}
                        <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] xl:text-[clamp(3.75rem,5vw,5rem)] font-bold tracking-tight leading-none text-foreground border-l-2 border-[#e9c349] pl-4 xl:pl-6">
                            Comienza una<br />
                            <span className="italic text-primary">conversación.</span>
                        </h1>

                        {/* Descripción */}
                        <p className="text-muted-foreground text-base xl:text-xl leading-relaxed max-w-[400px] xl:max-w-[520px]">
                            No dudes en contactarme para encontrar la solución tecnológica que mejor se adapte a ti.
                            Ya sea para crear una web de alto impacto, mantenimiento, bases de datos o soporte técnico, estoy aquí para ayudarte.
                            ¡O simplemente pásate a saludar, estaré encantado de charlar contigo!
                        </p>
                    </article>

                    {/* Article 2 — Imagen */}
                    <article className="rounded-[1.25rem] overflow-hidden h-full bg-card border border-1 border-border">
                        <img
                            src="https://i.pinimg.com/736x/1f/1a/21/1f1a2162ee95f61a276b54fa33d5ead9.jpg"
                            alt="Contacto"
                            className="w-full h-full object-cover"
                        />
                    </article>

                </div>
            </div>
        </section>
    )
}
