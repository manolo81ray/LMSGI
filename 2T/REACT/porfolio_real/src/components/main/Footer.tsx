
export default function Footer() {
    return(
        <footer className="py-6 text-center text-sm text-slate-400">
            {/* es una funcion JS que nos pone año  */}
            © {new Date().getFullYear()} - Mi porfolio
        </footer>
    )
}