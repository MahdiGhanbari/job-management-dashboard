'use client'

import { IJob } from "@/types/job"
import Menu, { IMenuItem } from "@/components/common/Menu"
import TableData, { ITableColumn, TableSkeleton } from "@/components/common/TableData"
import { ReactNode, Suspense } from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import clsx from "clsx"
import Link from "next/link"
import { IListResponse } from "@/types/common"
import { Card, CardContent } from "@/components/ui/card"


export default function JobTable({ data }: { data: Promise<IListResponse<IJob>>}) {
   
    function getActions(item: IJob): ReactNode {
        const items: (IMenuItem | null)[] = [
            { action: () => console.log('Edit' + item.title), title: "Edit" },
            {handler: ()=> <Link href={'/jobs/'+ item.id}>Details</Link>},
            null,
            { action: () => console.log('Delete' + item.title), title: "Delete", variant: 'destructive' }
        ]
        return (<Menu items={items}>
                <MoreHorizontalIcon />
            </Menu>)

    }

    function statusHandler(item: IJob):ReactNode {
        const classes = {
            Draft: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
            Active: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
            Closed: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
        }
   
      return <Badge className={clsx(classes[item.status])}> {item.status} </Badge>
      
    }

    const columns: ITableColumn<IJob>[] = [
        { title: 'Title', field: 'title' },
        { title: 'Departme', field: 'department' },
        { title: 'Location', field: 'location' },
        { title: 'Job Type', field: 'jobType' },
        { title: 'Status', handler: statusHandler },
        { title: 'Actions', handler: getActions },
    ]

  
    const perPageItems:Record<string, any>[] = [
        {label: '5', value: 5},
        {label: '10', value: 10},
        {label: '100', value: 100}
    ]

    return (
        <Card className="mt-4">
            <CardContent>
                <Suspense fallback={<TableSkeleton<IJob> columns={columns} rows={10}/>}>
                    <TableData {...{data, perPageItems}} columns={columns} />  
                </Suspense>
            </CardContent>
        </Card>
    )
}