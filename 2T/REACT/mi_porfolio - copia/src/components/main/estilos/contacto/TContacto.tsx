    import { useState } from 'react';

    export default function TContacto() {
    // 1. TU CORREO FIJO (El Destinatario oculto en el código)
    const MI_CORREO = 'mrg06eoi@gmail.com'; 

    // 2. Estados del formulario (Lo que rellena el usuario)
    const [ecliente, setEcliente] = useState(''); // El correo del cliente
    const [etlf, setEtlf] = useState(''); 
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleGenerateGmail = (e: React.FormEvent) => {
        e.preventDefault();
        
        const PARA = encodeURIComponent(MI_CORREO);
        const ASUNTO = encodeURIComponent(asunto);

        const FormularioCliente = `${mensaje}\n\n---\nDatos Personales:\nEmail de contacto: ${ecliente}\nTeléfono: ${etlf}`;
        const DatosCliente = encodeURIComponent(FormularioCliente);

        //Generccion de URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PARA}&su=${ASUNTO}&body=${DatosCliente}`;

        window.open(gmailUrl, '_blank');
    };

    return (
        <section className="min-h-screen bg-slate-950 flex items-center justify-center p-8 font-sans">
            <div className="w-full max-w-2xl bg-slate-900 p-12 md:p-7 shadow-2xl relative overflow-hidden">
                
                <div className="mb-10">
                    <h2 className="font-serif text-4xl md:text-4xl font-bold text-[#e9c349] flex items-center justify-center ">
                        Formulario de Email 
                    </h2>
                    <p className='py-5 text-base'>Rellena estos datos a continuaccion para contactar conmigo via gmail.</p>
                </div>

                <form onSubmit={handleGenerateGmail} className="space-y-10">
                            
                    {/* AHORA ESTE CAMPO ES PARA EL CLIENTE */}
                    <div id="correo_cliente" className="relative">
                        <span className="block text-sm font-medium text-white/60 mb-2">
                            Correo Electrónico
                        </span>
                        <input
                            value={ecliente}
                            onChange={(e) => setEcliente(e.target.value)}
                            placeholder="nombre@empresa.com"
                            className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-white placeholder:text-white/20 focus:ring-0 focus:outline-none focus:border-[#e9c349] focus:border-b-2 transition-colors"
                        />
                    </div>

                    <div id="n_telefono" className="relative">
                        <span className="block text-sm font-medium text-white/60 mb-2">
                            Teléfono 
                        </span>
                        <input
                            value={etlf}
                            onChange={(e) => setEtlf(e.target.value)}
                            placeholder="Ej: 777 77 77"
                            className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-white placeholder:text-white/20 focus:ring-0 focus:outline-none focus:border-[#e9c349] focus:border-b-2 transition-colors"
                        />
                    </div>

                    <div id="asunto" className="relative">
                        <span className="block text-sm font-medium text-white/60 mb-2">
                            Concepto / Asunto
                        </span>
                        <input
                            id="asunto"
                            value={asunto}
                            onChange={(e) => setAsunto(e.target.value)}
                            placeholder="Ej: Rediseño de plataforma..."
                            className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-white placeholder:text-white/20 focus:ring-0 focus:outline-none focus:border-[#e9c349] focus:border-b-2 transition-colors"
                        />
                    </div>

                    <div  id="mensaje" className="relative">
                        <span className="block text-sm font-medium text-white/60 mb-2">
                            Descripcion del mensaje
                        </span>
                        <textarea
                            id="mensaje"
                            rows={4}
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            placeholder="Detalle del mensaje..."
                            className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-white placeholder:text-white/20 focus:ring-0 focus:outline-none focus:border-[#e9c349] focus:border-b-2 transition-colors resize-none"
                        ></textarea>
                    </div>

                    <div id="e_gmail" className="flex justify-center">
                        <button
                            id="e_gmail"
                            className="px-8 py-4 bg-gradient-to-br from-yellow-400 to-yellow-600 text-slate-900 font-bold text-lg rounded-md shadow-2xl hover:opacity-90 transition-opacity"
                        >
                            Enviar a Gmail
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}