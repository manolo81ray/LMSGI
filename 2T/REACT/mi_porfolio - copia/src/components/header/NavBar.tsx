// ?
import { useState, useEffect } from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// ? useLocation
import { Link, useLocation } from 'react-router-dom'

import logo from '@/assets/logo_mrg_canva.png'

const opciones = [
    { name: 'Sobre mí', href: '/qsomos', current: false },
    { name: 'Formación', href: '/formacion', current: false },
    { name: 'Servicios', href: '/servicios', current: false },
    { name: 'Proyectos', href: '/proyectos', current: false },
    { name: 'Contactame', href: '/contacto', current: true },
]

export default function NavBar() {
    // ? 
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Disclosure as="nav" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(11,19,38,0.85)] backdrop-blur-xl shadow-[0_1px_0_rgba(90,100,128,0.12)]' : 'bg-transparent'}`}>
            <div className="mx-auto px-10 h-16 flex items-center justify-between">

                {/* Columna izquierda - Logo */}
                <div className="flex items-center gap-3">
                    <img alt="Logo" src={logo} className="h-8 w-auto" />
                    <span className="font-serif italic text-xl font-bold text-[#e9c349] tracking-tight">
                        Manolo R.G.
                    </span>
                </div>

                {/* Columna central - Links centrados */}
                <div className="hidden sm:flex items-center justify-center gap-8">
                    {opciones.filter(item => !item.current).map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`relative pb-1 text-sm font-medium transition-colors duration-200 no-underline ${isActive ? 'text-[#e9c349]' : 'text-[#e4e7f0] hover:text-[#e9c349]'}`}
                            >
                                {item.name}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9c349] rounded-sm" />
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Columna derecha - Botón o vacío */}
                <div className="hidden sm:flex items-center justify-end">
                    {opciones.filter(item => item.current).map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-linear-to-br from-[#e9c349] to-[#9d7d00] text-[#1a1200] text-[0.8125rem] font-semibold rounded-md transition-all duration-200 hover:opacity-90 hover:-translate-y-px no-underline"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Botón menú móvil */}
                <div className="sm:hidden">
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-[#e4e7f0] hover:text-[#e9c349] focus:outline-none transition-colors duration-200">
                        <span className="sr-only">Abrir menú</span>
                        <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                        <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                    </DisclosureButton>
                </div>
            </div>

            {/* Menú móvil */}
            <DisclosurePanel className="sm:hidden">
                <div className="flex flex-col gap-1 px-4 pb-4">
                    {opciones.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <DisclosureButton
                                key={item.name}
                                as={Link}
                                to={item.href}
                                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 no-underline ${isActive ? 'text-[#e9c349] bg-[rgba(233,195,73,0.08)]' : 'text-[#e4e7f0] hover:text-[#e9c349]'}`}
                            >
                                {item.name}
                            </DisclosureButton>
                        )
                    })}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}