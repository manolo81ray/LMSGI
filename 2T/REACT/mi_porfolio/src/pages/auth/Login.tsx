import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react'

import { useAuth } from '@/context/AuthContext'
import logo from '@/assets/logo_mrg.png'

// ─── Imagen del panel izquierdo ────────────────────────────────────────────
// Sustituye esta URL por la ruta de tu imagen (local: '/login-bg.jpg'
// o un import directo si la añades a src/assets/).
const BG_IMAGE = 'https://i.pinimg.com/736x/b8/62/27/b862279c4568d8f598b1da509ff65e57.jpg'
// ───────────────────────────────────────────────────────────────────────────

export const Login = () => {
    const { session, loading, signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail]           = useState('')
    const [password, setPassword]     = useState('')
    const [error, setError]           = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    if (!loading && session) {
        const destino = (location.state as { from?: string } | null)?.from ?? '/admin'
        return <Navigate to={destino} replace />
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setSubmitting(true)
        const { error: signInError } = await signIn(email, password)
        setSubmitting(false)
        if (signInError) {
            setError('Credenciales incorrectas o cuenta no habilitada.')
            return
        }
        navigate('/admin', { replace: true })
    }

    return (
        <main className="min-h-[125vh] w-full flex bg-[#060e1d]">

            {/* ── Panel izquierdo: imagen decorativa ────────────────── */}
            <div className="hidden lg:block relative flex-1 overflow-hidden">
                <img
                    src={BG_IMAGE}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#060e1d]/20 to-[#060e1d]" />
                <div className="absolute inset-0 bg-linear-to-t from-[#060e1d]/60 via-transparent to-transparent" />
            </div>

            {/* ── Panel derecho: formulario ──────────────────────────── */}
            <div className="relative w-full lg:w-[55%] shrink-0 flex flex-col bg-[#060e1d]">

                {/* Área central — ocupa todo el espacio disponible */}
                <div className="flex-1 flex flex-col items-center justify-center px-10 pr-20 xl:pr-28 gap-6">

                    {/* Contenido: ancho fijo para que no se estire */}
                    <div className="w-full max-w-105 flex flex-col gap-7">

                        {/* Logo + cabecera */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#0f1a2e] border border-[#e9c349]/25 flex items-center justify-center shadow-[0_0_28px_rgba(233,195,73,0.14)]">
                                <img src={logo} className="h-10 w-auto" alt="MRG" />
                            </div>
                            <h1 className="font-sans text-3xl font-bold text-white tracking-tight">
                                Acceso al backend
                            </h1>
                            <p className="text-[#8a93aa] text-base leading-relaxed max-w-70">
                                Solo cuentas habilitadas pueden entrar al panel.
                            </p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

                            {/* Campo: Email */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="login-email"
                                    className="text-xs font-bold tracking-[0.18em] uppercase text-[#e4e7f0]/60"
                                >
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#8a93aa]" aria-hidden="true" />
                                    <input
                                        id="login-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu@correo.com"
                                        className="w-full bg-[#0f1a2e] border border-[#e4e7f0]/10 rounded-xl pl-12 pr-4 py-4 text-base text-white placeholder:text-[#8a93aa]/60 focus:outline-none focus:border-[#e9c349]/50 focus:ring-1 focus:ring-[#e9c349]/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Campo: Contraseña */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="login-password"
                                    className="text-xs font-bold tracking-[0.18em] uppercase text-[#e4e7f0]/60"
                                >
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#8a93aa]" aria-hidden="true" />
                                    <input
                                        id="login-password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#0f1a2e] border border-[#e4e7f0]/10 rounded-xl pl-12 pr-4 py-4 text-base text-white placeholder:text-[#8a93aa]/60 focus:outline-none focus:border-[#e9c349]/50 focus:ring-1 focus:ring-[#e9c349]/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-sm text-red-400 text-center">{error}</p>
                            )}

                            {/* Botón de envío */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#e9c349] to-[#9d7d00] text-[#1a1200] text-base font-bold py-4 tracking-wide shadow-[0_8px_28px_rgba(233,195,73,0.28)] transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:translate-y-0"
                            >
                                {submitting ? (
                                    'Accediendo...'
                                ) : (
                                    <>Iniciar sesión <ArrowRight className="size-5" aria-hidden="true" /></>
                                )}
                            </button>
                        </form>

                        {/* Enlace "Volver" dentro del contenedor, debajo del botón */}
                        <div className="flex justify-center pt-2">
                            <Link
                                to="/"
                                className="flex items-center gap-1.5 text-sm text-[#8a93aa] hover:text-[#e9c349] transition-colors no-underline"
                            >
                                <ArrowLeft className="size-3.5" aria-hidden="true" />
                                Volver al porfolio
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}
