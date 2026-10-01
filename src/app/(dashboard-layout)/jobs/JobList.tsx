'use client'

import { IJob, IJobFilter, JopStatus } from "@/types/job"
import Menu, { IMenuItem } from "@/components/common/Menu"
import TableData, { ITableColumn } from "@/components/common/TableData"
import { ReactNode } from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { Paginate } from "@/components/common/Paginate"
import { useRouter } from "next/navigation"
import SelectInput from "@/components/common/SelectInput"
import { IListResponse } from "@/types/common"
import { Badge } from "@/components/ui/badge"
import clsx from "clsx"

export default function JobList({ data, searchParams }: { data: IListResponse<IJob>, searchParams: IJobFilter}) {
    const {items} = data
 
    const router = useRouter()
    const page = searchParams.page || 1
    const limit = searchParams.limit || 10

    function reload(qeury: IJobFilter) {
        const params = new URLSearchParams(Object.entries(qeury))
        router.push(`/jobs?${params}`)
    }
    function onChangePage(page: number) {
        const newParms = searchParams
        newParms.page = page
        reload(newParms)
    }
    function onChangeLimit(limit: number ) {
        const newParms = searchParams
        newParms.page = 1
        newParms.limit = limit
        reload(newParms)
    }
    function getActions(item: IJob): ReactNode {
        const items: (IMenuItem | null)[] = [
            { action: () => console.log('Edit' + item.title), title: "Edit" },
            { action: () => console.log('Duplicate' + item.title), title: "Duplicate" },
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

    const perPageItems = [
        {label: '5', value: 5},
        {label: '10', value: 10},
        {label: '100', value: 100}
    ]


    return (

            <TableData data={data.data} columns={columns} className="mt-4"
            pagination={<Paginate className="mt-4" totalItems={items} currentPage={+page} perPage={+limit} onPageChange={onChangePage}/> }
            perPage={<SelectInput value={limit} items={perPageItems} onValueChange={onChangeLimit}/>}
            />
  
 
    )
}