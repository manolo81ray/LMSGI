import type { IContacto } from "@/model/interfaces/contacto/IContacto"

interface Props {
    contacto: IContacto
}

export const ContactoCard = ({ contacto }: Props) => {
    const esRedesSociales = contacto.nombre === 'Redes Sociales';
    const esUbicacion = contacto.nombre === 'Ubicación';

    const svgs = Array.isArray(contacto.tecnologias) ? contacto.tecnologias : [];
    
    const urls = Array.isArray(contacto.URL) ? contacto.URL : [];
    const url = urls[0] || '';

    const svgStyles = "w-10 h-10 md:w-12 md:h-12 fill-[#e4e7f0] stroke-[#e4e7f0] group-hover:fill-[#e9c349] group-hover:stroke-[#e9c349] transition-all duration-300";
    const networkNames = ["YouTube", "LinkedIn", "Instagram", "Gmail"];

    return (
        <>
            {/* contenedor Redes Sociales */}
            {esRedesSociales && (
                <section className="col-span-full w-full bg-[##020618] py-16 px-6 lg:px-24 font-sans">
                    <div className="max-w-6xl mx-auto">
                        <span className="block text-[#e9c349] text-xs font-semibold tracking-[0.14em] uppercase mb-3">
                            Encuéntrame en mis
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#e4e7f0] mb-12 tracking-tight">
                            {contacto.nombre}
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {svgs.map((codigoSvg, index) => {
                                const enlaceDestino = urls[index] || '#';
                                const nombreRed = networkNames[index] || "Conectar";
                                const svgConClases = codigoSvg.replace('<svg ', `<svg class="${svgStyles}" `);

                                return (
                                    <a 
                                        key={index} 
                                        href={enlaceDestino} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center justify-center gap-6 bg-[#131b2e]/50 backdrop-blur-md rounded-2xl p-8 border border-[#e9c349]/10 shadow-lg hover:bg-[#131b2e]/80 hover:border-[#e9c349]/40 hover:-translate-y-2 transition-all duration-300"
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: svgConClases }} />
                                        <span className="text-[#e4e7f0]/60 text-sm font-medium tracking-wide group-hover:text-[#e9c349] transition-colors duration-300 uppercase">
                                            {nombreRed}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}
            
            {/* contenedor Ubicacion */}
            {esUbicacion && (
                <section className="col-span-full w-full bg-[#0b1326] font-sans py-6 px-6 lg:px-24">
                    <div className="max-w-6xl mx-auto">
                        
                        {/* Encabezado */}
                        <span className="text-[#e9c349] text-xs font-semibold tracking-[0.14em] uppercase mb-3 block">
                            ¿Dónde estoy?
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#e4e7f0] mb-3 tracking-tight">
                            Mi {contacto.nombre}
                        </h2>

                        {/*Mapa Interactivo*/}
                        <div className="relative w-full h-[450px] md:h-[600px] rounded-2xl overflow-hidden border border-[#e9c349]/30 shadow-[0_0_60px_rgba(233,195,73,0.12)]">
                            
                            {url ? (
                                <iframe 
                                    src={url}
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#131b2e] text-[#e4e7f0]">
                                    URL del mapa desconocida.
                                </div>
                            )}

                            {/* Tarjeta de informacion de ubicacion*/}
                            <div className="pointer-events-none absolute top-6 right-6 md:top-8 md:right-20 flex items-center gap-4 bg-[#0b1326]/80 backdrop-blur-md rounded-xl px-6 py-4 border border-[#e9c349]/20 shadow-2xl">
                                <div className="flex-shrink-0">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#e9c349"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-serif font-medium text-[#e9c349] text-lg tracking-wide">
                                        Almería, España
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}
        </>
    )
}