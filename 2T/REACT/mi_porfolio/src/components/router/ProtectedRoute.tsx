import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

// Guard de rutas: solo deja pasar si hay una sesión de Supabase Auth activa.
// Las cuentas se crean manualmente desde el dashboard de Supabase (sin registro público),
// así que tener sesión válida ya implica que la cuenta está habilitada.
export const ProtectedRoute = () => {
    const { session, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
                Cargando...
            </div>
        )
    }

    if (!session) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    return <Outlet />
}
