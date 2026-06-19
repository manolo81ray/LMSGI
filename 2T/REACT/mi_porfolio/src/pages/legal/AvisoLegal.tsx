import { Link } from "react-router-dom";
import { LegalPage, P, H2, UL, Strong, Nota } from "@/components/legal/LegalPage";

export const AvisoLegal = () => {
    return (
        <LegalPage titulo="Aviso Legal" actualizacion="Última actualización: Junio, 2026">

            <P>
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
                Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición de los usuarios
                los datos identificativos del titular de este sitio web, así como las condiciones que
                regulan su uso.
            </P>

            {/* 1 */}
            <H2>1. Datos Identificativos del Titular</H2>
            <UL>
                <li><Strong>Titular:</Strong> Manuel Rubio García</li>
                <li><Strong>Ubicación:</Strong> Almería, España</li>
                <li>
                    <Strong>Correo electrónico de contacto:</Strong>{" "}
                    <a href="mailto:mrg06eoi@gmail.com" className="text-primary underline underline-offset-2 hover:opacity-80">
                        mrg06eoi@gmail.com
                    </a>
                </li>
                <li><Strong>Finalidad del sitio:</Strong> porfolio personal con carácter informativo y profesional.</li>
            </UL>

            {/* 2 */}
            <H2>2. Objeto y Ámbito de Aplicación</H2>
            <P>
                El presente Aviso Legal regula el acceso, la navegación y el uso de este porfolio
                personal. La finalidad de la web es <Strong>dar a conocer mi trayectoria, formación,
                servicios y proyectos</Strong>, así como ofrecer una vía de contacto. El acceso al
                sitio implica la aceptación plena de las condiciones recogidas en este Aviso Legal.
            </P>

            {/* 3 */}
            <H2>3. Condiciones de Uso</H2>
            <P>
                El usuario se compromete a hacer un uso adecuado y lícito del sitio web y de sus
                contenidos, absteniéndose de:
            </P>
            <UL>
                <li>Utilizar la web con fines o efectos ilícitos, lesivos o que puedan dañar de cualquier forma el sitio o impedir su normal funcionamiento.</li>
                <li>Introducir o difundir programas maliciosos (virus, malware) que puedan causar daños en los sistemas.</li>
                <li>Intentar acceder a áreas restringidas, paneles de administración o datos de la web sin la debida autorización.</li>
            </UL>

            {/* 4 */}
            <H2>4. Propiedad Intelectual e Industrial</H2>
            <P>
                Todos los contenidos de este sitio web —textos, diseño gráfico, código fuente,
                logotipos, imágenes propias y la estructura de navegación— son titularidad de Manuel
                Rubio García o se utilizan con la debida licencia, y están protegidos por la normativa
                de propiedad intelectual e industrial.
            </P>
            <P>
                Queda prohibida su reproducción, distribución, comunicación pública o transformación
                total o parcial sin la autorización expresa del titular, salvo para uso personal y
                privado.
            </P>
            <Nota>
                <Strong>Nota:</Strong> algunas imágenes ilustrativas, iconos o mapas pueden pertenecer
                a sus respectivos autores o servicios de terceros y se emplean con carácter
                meramente informativo.
            </Nota>

            {/* 5 */}
            <H2>5. Exención de Responsabilidad</H2>
            <P>
                El titular procura mantener la información de la web actualizada y libre de errores,
                pero <Strong>no garantiza la inexistencia de errores ni la disponibilidad continua e
                ininterrumpida</Strong> del sitio. No se hace responsable de los daños que pudieran
                derivarse del uso de la web ni de fallos técnicos ajenos a su voluntad.
            </P>

            {/* 6 */}
            <H2>6. Enlaces a Sitios Externos</H2>
            <P>
                Este porfolio puede contener enlaces a sitios de terceros (redes sociales, repositorios,
                mapas, etc.). El titular <Strong>no se responsabiliza de los contenidos ni de las
                políticas de privacidad</Strong> de dichos sitios externos, que se rigen por sus
                propias condiciones.
            </P>

            {/* 7 */}
            <H2>7. Protección de Datos</H2>
            <P>
                El tratamiento de los datos personales que el usuario facilite a través de esta web se
                rige por lo establecido en la{" "}
                <Link to="/privacidad" className="text-primary underline underline-offset-2 hover:opacity-80">
                    Política de Privacidad
                </Link>
                , que forma parte integrante de este Aviso Legal.
            </P>

            {/* 8 */}
            <H2>8. Legislación Aplicable y Jurisdicción</H2>
            <P>
                Este Aviso Legal se rige por la <Strong>legislación española</Strong>. Para la
                resolución de cualquier controversia que pudiera derivarse del acceso o uso de la web,
                ambas partes se someten a los juzgados y tribunales que correspondan conforme a derecho.
            </P>
        </LegalPage>
    );
};
