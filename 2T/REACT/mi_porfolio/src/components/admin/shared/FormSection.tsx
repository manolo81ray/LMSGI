import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type Accent = "gold" | "indigo" | "teal" | "rose"

const accentChip: Record<Accent, string> = {
    gold: "bg-[rgba(233,195,73,0.18)] text-[#ffe088]",
    indigo: "bg-[rgba(99,102,241,0.18)] text-indigo-300",
    teal: "bg-[rgba(20,184,166,0.18)] text-teal-300",
    rose: "bg-[rgba(244,63,94,0.16)] text-rose-300",
}

interface FormSectionProps {
    title: string
    icon?: ReactNode
    accent?: Accent
    children: ReactNode
    className?: string
}

export const FormSection = ({ title, icon, accent = "gold", children, className }: FormSectionProps) => (
    <section
        className={cn(
            "rounded-2xl border border-white/8 bg-[#161f33] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.25)]",
            className,
        )}
    >
        <div className="mb-3.5 flex items-center gap-2.5 border-b border-white/8 pb-3">
            {icon && (
                <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg [&_svg]:size-4", accentChip[accent])}>
                    {icon}
                </span>
            )}
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
        </div>
        <div className="flex flex-col gap-4">{children}</div>
    </section>
)
