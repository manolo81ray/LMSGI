import type { ILenguajes } from "@/model/interfaces/home/ILenguajes";

interface Props {
    lenguaje: ILenguajes;
}

export const LenguajeCard = ({ lenguaje }: Props) => {
    return (
        <div className="group flex flex-col items-center justify-center bg-[#131b2e] rounded-xl aspect-[4/3] sm:aspect-square p-2 md:p-3 border border-[#e4e7f0]/5 shadow-[0_24px_48px_rgba(0,0,0,0.12)] hover:border-[#e9c349]/20 hover:-translate-y-1 transition-all duration-500 relative">
            
            {/* Contenedor del Logo gigante (Ocupa aprox el 60% del ancho disponible) */}
            {/* Hemos quitado márgenes inferiores rígidos para centrarlo mejor si no hay texto */}
            <div className={`flex items-center justify-center transition-all duration-500 ${lenguaje.nombre ? 'w-[50%] h-[50%] mb-2' : 'w-[50%] h-[50%]'}`}>
                <img 
                    src={lenguaje.logo} 
                    alt={lenguaje.nombre || "Tecnología"}
                    className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 filter grayscale group-hover:grayscale-0"
                />
            </div>

            {/* Etiqueta de texto (Solo se renderiza si hay nombre) */}
            {lenguaje.nombre && (
                <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#e4e7f0]/50 uppercase group-hover:text-[#e9c349] transition-colors duration-300 text-center w-full px-1 truncate">
                    {lenguaje.nombre}
                </span>
            )}
        </div>
    );
};