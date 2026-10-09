'use client'

import { Trash2Icon, Info } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactElement } from "react"

type Variant = 'Info' | 'Warnning'
interface Props {
    triger?: ReactElement,
    variant?: Variant,
    title: string,
    description: string,
    rejectTitle?: string,
    acceptTitle?: string,
    open?: boolean,
    onOpenChange?: (open: boolean, e: any) => void
    onCancel?: ()=> void
    onAccept?: ()=> void
}

export function ConfrimDialog({ triger, variant = "Info", title, description, rejectTitle = 'No', acceptTitle = 'Yes', open, onOpenChange, onCancel, onAccept }: Props) {
    const types: Record<Variant, any> = {
        Info: { class: 'bg-primary/10 text-primary', icon: <Info /> },
        Warnning: { class: "bg-destructive/10 text-destructive", icon: <Trash2Icon /> }
    }

    return (
        <AlertDialog {...{ open, onOpenChange }}>
            <AlertDialogTrigger render={triger} />

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className={types[variant].class}>
                        {types[variant].icon}
                    </AlertDialogMedia>
                    <AlertDialogTitle> {title} </AlertDialogTitle>
                    <AlertDialogDescription> {description} </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" onClick={onCancel}>{rejectTitle}</AlertDialogCancel>
                    <AlertDialogAction variant={variant == 'Warnning' ? "destructive" : 'default'} onClick={onAccept}>{acceptTitle}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
