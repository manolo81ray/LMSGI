import { LegalPage, P, H2, UL, Strong, Nota } from "@/components/legal/LegalPage";

export const Privacidad = () => {
    return (
        <LegalPage titulo="Política de Privacidad" actualizacion="Última actualización: Junio, 2026">

            <P>
                La presente Política de Privacidad de este porfolio personal tiene como objetivo
                informarte de manera transparente sobre cómo se tratan los datos personales que
                facilitas a través de esta web.
            </P>

            {/* 1 */}
            <H2>1. Responsable del Tratamiento de tus Datos</H2>
            <UL>
                <li><Strong>Nombre del titular:</Strong> Manuel Rubio García</li>
                <li><Strong>Ubicación:</Strong> Almería, España</li>
                <li>
                    <Strong>Correo electrónico de contacto:</Strong>{" "}
                    <a href="mailto:mrg06eoi@gmail.com" className="text-primary underline underline-offset-2 hover:opacity-80">
                        mrg06eoi@gmail.com
                    </a>
                </li>
            </UL>

            {/* 2 */}
            <H2>2. Datos Personales que se Recopilan</H2>
            <P>
                En este sitio web únicamente se recopilan los datos personales que tú mismo
                proporcionas de forma voluntaria al rellenar el formulario de contacto disponible
                en la web. Estos datos son:
            </P>
            <UL>
                <li><Strong>Nombre:</Strong> para saber cómo dirigirme a ti.</li>
                <li><Strong>Correo electrónico:</Strong> para poder responder a tu mensaje.</li>
                <li><Strong>Teléfono (opcional):</Strong> por si prefieres que el contacto sea telefónico.</li>
                <li>
                    <Strong>Información del mensaje:</Strong> cualquier dato que decidas incluir
                    voluntariamente en el cuerpo del contenedor de contacto (consultas sobre
                    servicios, propuestas para el desarrollo de páginas web, preguntas acerca de mi
                    formación o trayectoria, sugerencias, etc.).
                </li>
            </UL>
            <Nota>
                <Strong>Nota de transparencia:</Strong> en esta web no se recopilan de forma oculta
                datos sensibles, ni se realiza un rastreo masivo o automatizado de tu información de
                navegación.
            </Nota>

            {/* 3 */}
            <H2>3. Finalidad del Tratamiento</H2>
            <P>
                La única finalidad con la que se recogen estos datos es la de gestionar y responder a
                tu solicitud. Al enviarme tus datos a través del formulario, estos se reciben
                directamente en mi bandeja de entrada de correo electrónico para:
            </P>
            <UL>
                <li>Atender de forma personalizada tus propuestas de servicios o proyectos web.</li>
                <li>Resolver tus dudas acerca de mi trayectoria y formación académica o profesional.</li>
                <li>Mantener una comunicación fluida y ofrecerte la mejor respuesta posible adaptada a lo que me solicitas.</li>
            </UL>
            <Nota>
                <Strong>Sobre el envío del formulario:</Strong> al pulsar «Enviar» se abre tu propio
                cliente de Gmail con el mensaje ya redactado; el correo se envía desde tu cuenta y
                llega a mi bandeja de entrada. No existe una base de datos intermedia que almacene lo
                que escribes en el formulario.
            </Nota>

            {/* 4 */}
            <H2>4. Legitimación para el Tratamiento</H2>
            <P>
                La base legal que legitima el tratamiento de tus datos es tu propio{" "}
                <Strong>consentimiento explícito</Strong>. Al rellenar tus datos en el formulario,
                marcar la casilla de aceptación de esta Política de Privacidad y hacer clic de forma
                consciente en el botón de enviar, confirmas que estás de acuerdo con que yo reciba esa
                información para poder darte una respuesta adecuada.
            </P>

            {/* 5 */}
            <H2>5. Destinatarios y Confidencialidad</H2>
            <P>
                Tus datos <Strong>no serán compartidos, vendidos, cedidos ni transmitidos a ninguna
                otra persona o empresa externa</Strong>. La información que envíes será gestionada de
                forma interna y confidencial exclusivamente por mí (Manuel Rubio García) para el
                propósito antes mencionado.
            </P>

            {/* 6 */}
            <H2>6. Plazo de Conservación de los Datos</H2>
            <P>
                Tus datos personales se conservarán únicamente durante el tiempo que sea estrictamente
                necesario para gestionar y resolver la consulta que nos une o{" "}
                <Strong>hasta que concluya formalmente la relación profesional</Strong> derivada de tu
                mensaje. Una vez finalizada dicha comunicación o relación, los correos correspondientes
                serán eliminados de manera segura.
            </P>

            {/* 7 */}
            <H2>7. Tus Derechos sobre tus Datos</H2>
            <P>
                Como usuario y propietario de tus datos, tienes pleno derecho a controlar qué se hace
                con ellos bajo la normativa de protección de datos. Puedes ejercer en cualquier momento
                tus derechos de:
            </P>
            <UL>
                <li><Strong>Acceso:</Strong> saber qué datos tengo guardados de ti.</li>
                <li><Strong>Rectificación:</Strong> modificar o corregir tus datos si hay algún error.</li>
                <li><Strong>Supresión (Olvido):</Strong> solicitar que elimine por completo tus correos y datos de mi bandeja de entrada.</li>
                <li><Strong>Oposición o Limitación:</Strong> solicitar que no use tus datos para determinados fines.</li>
            </UL>
            <P>
                Para ejercer cualquiera de estos derechos, solo tienes que enviarme un correo
                electrónico a{" "}
                <a href="mailto:mrg06eoi@gmail.com" className="text-primary underline underline-offset-2 hover:opacity-80">
                    mrg06eoi@gmail.com
                </a>{" "}
                indicando tu nombre y el derecho que deseas ejercer, y procederé a gestionarlo e
                informarte de inmediato.
            </P>

            {/* 8 — añadido */}
            <H2>8. Cookies y Tecnologías de Terceros</H2>
            <P>
                Este sitio web <Strong>no utiliza cookies propias de seguimiento ni con fines
                publicitarios o de analítica</Strong>. No se elabora ningún perfil sobre tu
                comportamiento de navegación.
            </P>
            <P>
                Únicamente, en la página de contacto se incrusta un mapa de <Strong>Google Maps</Strong>
                para mostrar mi ubicación. Al cargar dicho mapa, Google puede instalar cookies propias
                sujetas a su propia política de privacidad, sobre las que este porfolio no tiene
                control.
            </P>

            {/* 9 — añadido */}
            <H2>9. Seguridad de los Datos</H2>
            <P>
                Me comprometo a tratar tus datos con la máxima diligencia y a aplicar las medidas
                razonables a mi alcance para protegerlos frente a accesos no autorizados, pérdida o uso
                indebido. No obstante, debes tener en cuenta que ninguna transmisión por internet es
                100&nbsp;% segura.
            </P>

            {/* 10 — añadido */}
            <H2>10. Cambios en esta Política de Privacidad</H2>
            <P>
                Esta Política de Privacidad podrá actualizarse para adaptarse a posibles cambios
                legislativos o a nuevas funcionalidades de la web. Cualquier modificación se publicará
                en esta misma página, indicando siempre la fecha de la última actualización en la
                cabecera.
            </P>
        </LegalPage>
    );
};
