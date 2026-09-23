'use client'
import { IJob } from "@/types/job"
import Menu, { IMenuItem } from "@/components/common/Menu"
import TableData, { ITableColumn } from "@/components/common/TableData"
import { ReactNode } from "react"
import { MoreHorizontalIcon } from "lucide-react"

export default function JobList({ data }: { data: IJob[] }) {

    function getActions(item: IJob): ReactNode {
        const items: (IMenuItem | null)[] = [
            { action: () => console.log('Edit' + item.title), title: "Edit" },
            { action: () => console.log('Duplicate' + item.title), title: "Duplicate" },
            null,
            { action: () => console.log('Delete' + item.title), title: "Delete", variant: 'destructive' }
        ]
        console.log(item.title)
        return (<Menu items={items}>
                <MoreHorizontalIcon />
            </Menu>)

    }

    const columns: ITableColumn<IJob>[] = [
        { title: 'Title', field: 'title' },
        { title: 'Departme', field: 'department' },
        { title: 'Location', field: 'location' },
        { title: 'Job Type', field: 'jobType' },
        { title: 'Actions', handler: getActions },
    ]


    return (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
            <TableData data={data} columns={columns} />
        </div>
    )
}