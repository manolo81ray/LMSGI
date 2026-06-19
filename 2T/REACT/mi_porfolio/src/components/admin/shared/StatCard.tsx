import type { ReactNode } from "react"

interface StatCardProps {
    label: string
    value: string | number
    icon: ReactNode
    iconBg: string
}

export const StatCard = ({ label, value, icon, iconBg }: StatCardProps) => (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
        <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
            <p className="mt-1.5 text-3xl font-semibold text-foreground">{value}</p>
        </div>
        <div
            className="flex size-11 shrink-0 items-center justify-center rounded-lg"
            style={{ background: iconBg }}
        >
            {icon}
        </div>
    </div>
)
