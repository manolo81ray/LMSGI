import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

// Placeholder del panel de administración. Aquí irá la gestión de contenido
// (servicios, proyectos, formación, cursos, contacto) leída/escrita vía Supabase.
export const Admin = () => {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate('/login', { replace: true })
    }

    return (
        <main className="min-h-screen w-full bg-background text-foreground px-10 py-10">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-serif text-3xl font-bold">Panel de administración</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Sesión iniciada como {user?.email}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                    Cerrar sesión
                </button>
            </header>

            <div className="rounded-xl border border-border bg-card p-8 text-muted-foreground">
                Aquí vivirá la gestión del contenido del portfolio (servicios, proyectos, formación, cursos y contacto).
            </div>
        </main>
    )
}
