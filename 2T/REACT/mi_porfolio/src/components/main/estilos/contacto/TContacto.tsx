    import { useState } from 'react';
    import { Link } from 'react-router-dom';

    export default function TContacto() {
    // 1. TU CORREO FIJO (El Destinatario oculto en el código)
    const MI_CORREO = 'mrg06eoi@gmail.com';

    // 2. Estados del formulario (Lo que rellena el usuario)
    const [ecliente, setEcliente] = useState(''); // El correo del cliente
    const [etlf, setEtlf] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Consentimiento RGPD: desmarcado por defecto, obligatorio antes de enviar
    const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);

    const handleGenerateGmail = (e: React.FormEvent) => {
        e.preventDefault();

        // Sin consentimiento explícito no se permite el envío (RGPD)
        if (!aceptaPrivacidad) return;

        const PARA = encodeURIComponent(MI_CORREO);
        const ASUNTO = encodeURIComponent(asunto);

        const FormularioCliente = `${mensaje}\n\n---\nDatos Personales:\nEmail de contacto: ${ecliente}\nTeléfono: ${etlf}`;
        const DatosCliente = encodeURIComponent(FormularioCliente);

        //Generccion de URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PARA}&su=${ASUNTO}&body=${DatosCliente}`;

        window.open(gmailUrl, '_blank');
    };

    return (
        <section className="min-h-screen bg-[#131b2e] flex items-center justify-center p-4 sm:p-8 xl:p-12 font-sans">
            <div className="w-full max-w-2xl xl:max-w-3xl bg-card border border-border p-6 sm:p-10 md:p-7 xl:p-12 shadow-2xl relative overflow-hidden">

                <div className="mb-10 xl:mb-14">
                    <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-bold text-primary text-center">
                        Formulario de Email
                    </h2>
                    <p className='py-5 text-base xl:text-lg text-muted-foreground'>Rellena estos datos a continuaccion para contactar conmigo via gmail.</p>
                </div>

                <form onSubmit={handleGenerateGmail} className="space-y-10 xl:space-y-12">

                    {/* AHORA ESTE CAMPO ES PARA EL CLIENTE */}
                    <div id="correo_cliente" className="relative">
                        <span className="block text-sm xl:text-lg font-medium text-muted-foreground mb-2">
                            Correo Electrónico
                        </span>
                        <input
                            value={ecliente}
                            onChange={(e) => setEcliente(e.target.value)}
                            placeholder="nombre@empresa.com"
                            className="w-full bg-transparent border-0 border-b border-border px-0 py-3 xl:py-4 text-foreground xl:text-lg placeholder:text-muted-foreground/60 focus:ring-0 focus:outline-none focus:border-primary focus:border-b-2 transition-colors"
                        />
                    </div>

                    <div id="n_telefono" className="relative">
                        <span className="block text-sm xl:text-lg font-medium text-muted-foreground mb-2">
                            Teléfono
                        </span>
                        <input
                            value={etlf}
                            onChange={(e) => setEtlf(e.target.value)}
                            placeholder="Ej: 777 77 77"
                            className="w-full bg-transparent border-0 border-b border-border px-0 py-3 xl:py-4 text-foreground xl:text-lg placeholder:text-muted-foreground/60 focus:ring-0 focus:outline-none focus:border-primary focus:border-b-2 transition-colors"
                        />
                    </div>

                    <div id="asunto" className="relative">
                        <span className="block text-sm xl:text-lg font-medium text-muted-foreground mb-2">
                            Concepto / Asunto
                        </span>
                        <input
                            id="asunto"
                            value={asunto}
                            onChange={(e) => setAsunto(e.target.value)}
                            placeholder="Ej: Rediseño de plataforma..."
                            className="w-full bg-transparent border-0 border-b border-border px-0 py-3 xl:py-4 text-foreground xl:text-lg placeholder:text-muted-foreground/60 focus:ring-0 focus:outline-none focus:border-primary focus:border-b-2 transition-colors"
                        />
                    </div>

                    <div  id="mensaje" className="relative">
                        <span className="block text-sm xl:text-lg font-medium text-muted-foreground mb-2">
                            Descripcion del mensaje
                        </span>
                        <textarea
                            id="mensaje"
                            rows={4}
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            placeholder="Detalle del mensaje..."
                            className="w-full bg-transparent border-0 border-b border-border px-0 py-3 xl:py-4 text-foreground xl:text-lg placeholder:text-muted-foreground/60 focus:ring-0 focus:outline-none focus:border-primary focus:border-b-2 transition-colors resize-none"
                        ></textarea>
                    </div>

                    {/* Consentimiento RGPD: casilla desmarcada por defecto y obligatoria */}
                    <div id="consentimiento" className="flex items-start gap-3">
                        <input
                            id="acepta_privacidad"
                            type="checkbox"
                            checked={aceptaPrivacidad}
                            onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                            required
                            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                        />
                        <label htmlFor="acepta_privacidad" className="text-sm xl:text-base text-muted-foreground leading-snug cursor-pointer">
                            Acepto la{' '}
                            <Link
                                to="/privacidad"
                                className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
                            >
                                Política de Privacidad
                            </Link>
                            .
                        </label>
                    </div>

                    <div id="e_gmail" className="flex justify-center">
                        <button
                            id="e_gmail"
                            disabled={!aceptaPrivacidad}
                            className="px-8 py-4 xl:px-10 xl:py-5 bg-gradient-to-br from-primary to-[#9d7d00] text-primary-foreground font-bold text-lg xl:text-xl rounded-md shadow-2xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Enviar a Gmail
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}