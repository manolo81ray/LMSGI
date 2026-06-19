import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, SearchIcon } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AdminTableShellProps {
    search: string
    onSearchChange: (v: string) => void
    searchPlaceholder: string
    addLabel: string
    onAdd: () => void
    page: number
    pageSize: number
    total: number
    entityLabel: string
    onPrev: () => void
    onNext: () => void
    children: ReactNode
}

export const AdminTableShell = ({
    search, onSearchChange, searchPlaceholder,
    addLabel, onAdd,
    page, pageSize, total, entityLabel,
    onPrev, onNext,
    children,
}: AdminTableShellProps) => {
    const from = total === 0 ? 0 : page * pageSize + 1
    const to = Math.min((page + 1) * pageSize, total)

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-72">
                    <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        className="pl-9"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <div className="hidden flex-1 sm:block" />
                <Button onClick={onAdd} className="w-full sm:w-auto">
                    <PlusIcon />
                    {addLabel}
                </Button>
            </div>

            {children}

            <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <p className="text-sm text-muted-foreground">
                    <span className="hidden sm:inline">Mostrando </span>
                    {from}–{to}
                    <span className="hidden sm:inline"> de {total} {entityLabel}</span>
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon-sm" onClick={onPrev} disabled={page === 0} aria-label="Página anterior">
                        <ChevronLeftIcon />
                    </Button>
                    <Button variant="outline" size="icon-sm" onClick={onNext} disabled={to >= total} aria-label="Página siguiente">
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}
