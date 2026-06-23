// ? Menú de ajustes: paleta de colores (claro/oscuro) + acceso al backend (login)
import { Menu, MenuButton, MenuItems, MenuItem, Switch } from '@headlessui/react'
import { Link } from 'react-router-dom'
import {
    Cog6ToothIcon,
    SunIcon,
    MoonIcon,
    ArrowRightOnRectangleIcon,
    ArrowLeftOnRectangleIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline'

import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'

export const SettingsMenu = () => {
    const { theme, toggleTheme } = useTheme()
    const { session, signOut } = useAuth()
    const isDark = theme === 'dark'

    return (
        <Menu as="div" className="relative">
            <MenuButton
                aria-label="Ajustes"
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 transition-colors duration-200 hover:bg-foreground/5 hover:text-primary focus:outline-none"
            >
                <Cog6ToothIcon className="size-5" aria-hidden="true" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="z-50 mt-2 w-64 origin-top-right rounded-lg border border-border bg-card p-2 shadow-xl transition duration-150 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                {/* Selector de paleta claro / oscuro */}
                <div className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        {isDark ? (
                            <MoonIcon className="size-4 text-primary" aria-hidden="true" />
                        ) : (
                            <SunIcon className="size-4 text-primary" aria-hidden="true" />
                        )}
                        <span>Tema {isDark ? 'oscuro' : 'claro'}</span>
                    </div>
                    <Switch
                        checked={isDark}
                        onChange={toggleTheme}
                        className="group inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-muted transition-colors data-checked:bg-primary"
                    >
                        <span className="sr-only">Cambiar a tema {isDark ? 'claro' : 'oscuro'}</span>
                        <span className="size-3.5 translate-x-1 rounded-full bg-background transition-transform group-data-checked:translate-x-4" />
                    </Switch>
                </div>

                <div className="my-1 h-px bg-border" />

                {/* Acceso al backend del proyecto */}
                {session ? (
                    <>
                        <MenuItem>
                            <Link
                                to="/admin"
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground no-underline data-focus:bg-muted"
                            >
                                <Squares2X2Icon className="size-4" aria-hidden="true" />
                                Panel de administración
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <button
                                type="button"
                                onClick={signOut}
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-medium text-foreground data-focus:bg-muted"
                            >
                                <ArrowLeftOnRectangleIcon className="size-4" aria-hidden="true" />
                                Cerrar sesión
                            </button>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem>
                        <Link
                            to="/login"
                            className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground no-underline data-focus:bg-muted"
                        >
                            <ArrowRightOnRectangleIcon className="size-4" aria-hidden="true" />
                            Iniciar sesión
                        </Link>
                    </MenuItem>
                )}
            </MenuItems>
        </Menu>
    )
}
