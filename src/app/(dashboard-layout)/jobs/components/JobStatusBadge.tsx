'use client'

import { Badge } from "@/components/ui/badge"
import { JopStatus } from "@/types/job"
import clsx from "clsx"
import { ReactNode } from "react"

export default function JobStatusBadge({status, className}: {status: JopStatus, className?: string}):ReactNode {
    const classes = {
        Draft: "border-sky-200 bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
        Active: "border-green-200 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
        Closed: "border-red-200 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
    }

  return <Badge className={clsx(className, classes[status], 'px-4 py-3')}> {status} </Badge>
  
}