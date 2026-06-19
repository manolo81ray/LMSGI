import { Link, useLocation } from 'react-router-dom'

import logo from '@/assets/logo_mrg.png'
import { SettingsMenu } from './SettingsMenu'

const NAV = [
    { name: 'Sobre mí',  href: '/qsomos' },
    { name: 'Formación', href: '/formacion' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Proyectos', href: '/proyectos' },
]
const CTA = { name: 'Contáctame', href: '/contacto' }

export default function NavBar() {
    const location  = useLocation()

    const currentPath = location.pathname === '/' ? '/qsomos' : location.pathname

    return (
        <nav className="relative z-1 shrink-0 w-full bg-[#1f2937] border-b border-[rgba(233,195,73,0.45)]">

            <div className="hidden min-[800px]:flex mx-auto px-8 xl:px-14 h-17 xl:h-21.25 items-center justify-between">

                {/* Logo */}
                <Link to="/qsomos" className="flex items-center gap-3 xl:gap-4 no-underline group shrink-0">
                    <img
                        alt="MRG logo"
                        src={logo}
                        className="h-9 xl:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="font-serif italic text-[1.15rem] xl:text-[1.45rem] font-bold text-primary tracking-tight leading-none">
                        Manolo R.G.
                    </span>
                </Link>

                {/* Enlaces con subrayado animado */}
                <div className="flex items-center gap-0.5 xl:gap-1.5">
                    {NAV.map((item) => {
                        const isActive = currentPath === item.href
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`relative px-4 py-2 xl:px-5 xl:py-2.5 text-sm xl:text-[1.1rem] font-medium rounded-md transition-all duration-200 no-underline select-none ${
                                    isActive
                                        ? 'text-primary'
                                        : 'text-foreground/75 hover:text-foreground hover:bg-foreground/6'
                                }`}
                            >
                                {item.name}
                                <span
                                    className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary transition-transform duration-300 origin-left ${
                                        isActive ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                                />
                            </Link>
                        )
                    })}
                </div>

                {/* CTA + Ajustes */}
                <div className="flex items-center gap-2 xl:gap-3 shrink-0">
                    <Link
                        to={CTA.href}
                        className="inline-flex items-center px-5 py-[0.45rem] xl:px-7 xl:py-2.5 rounded-lg bg-linear-to-br from-primary to-[#c49500] text-primary-foreground text-[0.82rem] xl:text-[1.02rem] font-bold tracking-wide shadow-[0_2px_16px_rgba(233,195,73,0.28)] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(233,195,73,0.45)] hover:-translate-y-px active:translate-y-0 no-underline"
                    >
                        {CTA.name}
                    </Link>
                    <SettingsMenu />
                </div>
            </div>

            <div className="min-[800px]:hidden">

                {/* ── Fila 1: logo · Contáctame · ajustes ─────────────────── */}
                <div className="flex items-center justify-between gap-3 px-4 sm:px-6 pt-3 pb-2">

                    {/* Logo */}
                    <Link to="/qsomos" className="flex items-center gap-2 no-underline group shrink-0">
                        <img
                            alt="MRG logo"
                            src={logo}
                            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="font-serif italic text-[1.05rem] font-bold text-primary tracking-tight leading-none">
                            Manolo R.G.
                        </span>
                    </Link>

                    {/* Botón Contáctame + Ajustes */}
                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            to={CTA.href}
                            className="inline-flex items-center px-3 py-[0.3rem] rounded-md bg-linear-to-br from-primary to-[#c49500] text-primary-foreground text-[0.7rem] font-bold tracking-wide shadow-[0_2px_16px_rgba(233,195,73,0.28)] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(233,195,73,0.45)] active:translate-y-0 no-underline"
                        >
                            {CTA.name}
                        </Link>
                        <SettingsMenu />
                    </div>
                </div>

                {/* ── Fila 2: enlaces repartidos a lo ancho ───────────────── */}
                <div className="flex items-center justify-between gap-1 px-4 sm:px-6 pb-2">
                    {NAV.map((item) => {
                        const isActive = currentPath === item.href
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`relative whitespace-nowrap pt-1.5 pb-2.5 text-[0.8rem] font-medium tracking-tight transition-colors duration-200 no-underline select-none ${
                                    isActive
                                        ? 'text-primary'
                                        : 'text-foreground/75 hover:text-foreground'
                                }`}
                            >
                                {item.name}
                                {/* Línea dorada del enlace activo */}
                                <span
                                    className={`absolute bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary transition-transform duration-300 origin-left ${
                                        isActive ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
