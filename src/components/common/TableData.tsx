'use client'

import { ReactNode, use } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import clsx from "clsx"
import { IListResponse } from "@/types/common"
import { Paginate, PaginationProps } from "./Paginate"
import { Skeleton } from "../ui/skeleton"


export interface ITableColumn<T> {
    title: string,
    field?: keyof T,
    handler?: (item: T) => ReactNode | string
}


interface Props<T> extends Omit<PaginationProps, 'totalItems'> {
    data: Promise<IListResponse<T>>,
    columns: ITableColumn<T>[],
    minHeight?: string | number
    maxHeight?: string | number
    className?: string
}

function TableDataHeader<T>({ columns}: {columns: ITableColumn<T>[]}): ReactNode {
    return (
        <TableHeader className="bg-gray-100">
            <TableRow>
                {columns.map((column, index) => {
                    return (<TableHead key={column.title + index}>{column.title}</TableHead>)
                })}
            </TableRow>
        </TableHeader>
    )
}

export function TableSkeleton<T>({ columns, rows }: { columns: ITableColumn<T>[]; rows: number }): ReactNode {
    return (
        <div className="rounded-lg border border-gray-200 overflow-hidden ">
            <Table>
                <TableDataHeader columns={columns}/>
                <TableBody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>{
                            Array.from({ length: columns.length }).map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    <Skeleton className="h-6 w-[150px]" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default function TableData<T>({ data, columns, minHeight = 300, maxHeight = 600, className, perPageItems, visiblePage }: Props<T>) {
    const { data: rows, items: totalItems } = use(data)
    let body: ReactNode = (
        <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center"> No Data</TableCell>
        </TableRow>
    )
    if (rows && rows.length) {
        body = rows.map((item, index) => {
            return (
                <TableRow key={'row' + index}>
                    {
                        columns.map(({ field, title, handler }) => {
                            return (
                                <TableCell key={title}>
                                    {
                                        (field && String(item[field] ?? '-')) ||
                                        (!field && handler && handler(item))
                                    }
                                </TableCell>
                            )
                        })
                    }
                </TableRow>
            )
        })
    }

    return (
        <>
            <div className={clsx("rounded-lg border border-gray-200 overflow-hidden ", className)}>
                <Table>
                    <TableDataHeader columns={columns}/>
                    <TableBody className="overflow-scroll" style={{ "minHeight": minHeight + 'px', "maxHeight": maxHeight + 'px' }}>
                        {body}
                    </TableBody>
                </Table>

            </div>
            <Paginate  {...{ perPageItems, visiblePage, totalItems }} />
        </>


    )
}