import type { ReactNode } from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface AdminFormSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    isEditing: boolean
    /** Nombre de la entidad en singular, p.ej. "proyecto" */
    entity: string
    /** true para entidades femeninas ("Nueva formacion", "de la formacion") */
    feminine?: boolean
    children: ReactNode
}

export const AdminFormSheet = ({
    open,
    onOpenChange,
    isEditing,
    entity,
    feminine = false,
    children,
}: AdminFormSheetProps) => {
    const nuevo = feminine ? "Nueva" : "Nuevo"

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                showCloseButton={false}
                className="admin-theme dark w-full gap-0 overflow-y-auto bg-[#0b1326] p-0 sm:max-w-md"
            >
                <SheetHeader className="sr-only">
                    <SheetTitle>{isEditing ? `Editar ${entity}` : `${nuevo} ${entity}`}</SheetTitle>
                    <SheetDescription>
                        {isEditing ? `Edita los datos del registro de ${entity}.` : `Crea un nuevo registro de ${entity}.`}
                    </SheetDescription>
                </SheetHeader>

                <SheetClose asChild>
                    <Button variant="ghost" size="icon-sm" aria-label="Cerrar" className="absolute right-5 top-9 z-20 text-muted-foreground">
                        <XIcon />
                    </Button>
                </SheetClose>

                <div className="admin-form-fields px-5 py-5">{children}</div>
            </SheetContent>
        </Sheet>
    )
}
