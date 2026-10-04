'use client'

import { ReactNode, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import clsx from "clsx"

export interface ITableColumn<T> {
    title: string,
    field?: keyof T,
    handler?: (item: T) => ReactNode | string
}

interface Props<T> {
    data: T[],
    columns: ITableColumn<T>[],
    pagination?: ReactNode
    perPage?: ReactNode,
    minHeight?: string | number
    maxHeight?: string | number
    className?: string
}

export default function TableData<T>({ data, columns, pagination, perPage, minHeight=300, maxHeight=600, className }: Props<T>) {

    let body: ReactNode = (
        <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center"> No Data</TableCell>
        </TableRow>
    )
    if(data && data.length) {
        body =  data.map((item, index) => {
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
        <div>
            <div className={clsx("rounded-lg border border-gray-200 overflow-hidden ", className)}>
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {columns.map((column, index) => {
                                return (<TableHead key={column.title + index}>{column.title}</TableHead>)
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="overflow-scroll"  style={{"minHeight": minHeight+'px', "maxHeight": maxHeight+'px'}}>
                        {body}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between">
                {perPage}
                { pagination }
            </div>
        </div>

    )
}