'use client'

import { ReactNode } from "react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

export interface IMenuItem {
    title: string
    variant?: 'default' | 'destructive'
    action?: (arg?: any)=> void
}

export default function Menu({children, items}: {children: ReactNode, items: (IMenuItem | null)[]}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8">{children}<span className="sr-only">Open menu</span></Button>} />
            <DropdownMenuContent align="end">
                {items.map((item, index)=> {
                    return (
                        <>
                         {item && <DropdownMenuItem key={item.title + index} onClick={item.action} variant={item.variant}>{item.title}</DropdownMenuItem>}
                         {!item && <DropdownMenuSeparator key={'sperator' + index}></DropdownMenuSeparator>}
                        </>
                    )
                })}
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}