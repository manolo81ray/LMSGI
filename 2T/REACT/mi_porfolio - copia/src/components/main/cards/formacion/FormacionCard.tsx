import type { IFormacion } from "@/model/interfaces/formacion/IFormacion";
import { Link } from "react-router-dom";

interface Props {
    formacion: IFormacion;
}

export const FormacionCard = ({ formacion }: Props) => {
    
    const formatearFecha = (fechaIso: string) => {
        if (!fechaIso) return "Presente";
        const fecha = new Date(fechaIso);
        const formateado = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(fecha);
        return formateado.charAt(0).toUpperCase() + formateado.slice(1);
    };

    const fechaInicio = formatearFecha(formacion.fecha_inicio);
    const fechaFin = formatearFecha(formacion.fecha_fin);

    return (
        <Link 
            to={`/formacion/${formacion.id}`}
            // CAMBIO 1: Hemos quitado la clase 'h-full' del final
            className="group flex flex-col bg-[#131b2e] rounded-md p-6 md:p-8 border border-[#e4e7f0]/5 shadow-[0_24px_48px_rgba(0,0,0,0.12)] hover:border-[#e9c349]/20 transition-all duration-500 hover:-translate-y-1"
        >
            {/* Cabecera */}
            <div className="flex justify-end items-center mb-4">
                <span className="font-sans text-[11px] font-medium tracking-wide text-[#e4e7f0]/60">
                    {fechaInicio} — {fechaFin}
                </span>
            </div>

            {/* Título */}
            <h3 className="font-serif text-3xl md:text-[32px] text-[#e4e7f0] leading-tight mb-6 group-hover:text-[#e9c349] transition-colors duration-300">
                {formacion.nombre}
            </h3>

            {/* Descripción */}
            <p className="font-sans text-[#e4e7f0]/70 text-sm leading-[1.6] font-light mb-6">
                {formacion.descripcion}
            </p>

            {/* Bloque de Institución (Este mb-6 es el que dictará el espacio con la línea de abajo) */}
            <div className="flex items-center justify-center gap-4 mb-6 ">
                <div className="w-[35%] h-29 flex-shrink-0 rounded-sm overflow-hidden bg-[#e4e7f0] border border-[#e4e7f0]/10">
                    <img 
                        src={formacion.imagen} 
                        alt={formacion.institucion}
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                </div>
                
                <div className="flex flex-col">
                    <span className="font-sans text-sm font-bold text-[#e4e7f0] tracking-wide">
                        {formacion.institucion}
                    </span>
                    <span className="font-sans text-xs font-medium text-[#e9c349] mt-0.5">
                        {formacion.lugar_institucion}
                    </span>
                </div>
            </div>

            {/* CAMBIO 2: Hemos quitado 'mt-auto'. Ahora el espacio será exactamente 
                el que dicte el margen inferior del bloque de arriba */}
            <div className="pt-4 border-t border-[#e4e7f0]/5">
                <div className="flex items-center gap-3 text-[#e9c349] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">
                    <span>Ver Formación</span>
                    <span className="text-lg transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                </div>
            </div>
        </Link>
    );
};