'use client'

import { ReactNode, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export interface ITableColumn<T> {
    title: string,
    field?: keyof T,
    handler?: (item: T) => ReactNode | string
}

interface Props<T> {
    data: T[],
    columns: ITableColumn<T>[],
    pagination?: ReactNode
    perPage?: ReactNode
}

export default function TableData<T>({ data, columns, pagination, perPage }: Props<T>) {
    let body: ReactNode = <span>no data</span>
    if(data) {
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
            <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {columns.map((column, index) => {
                                return (<TableHead key={column.title + index}>{column.title}</TableHead>)
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
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