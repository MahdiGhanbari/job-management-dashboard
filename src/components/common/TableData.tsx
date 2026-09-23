'use client'

import { ReactNode } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export interface ITableColumn<T> {
    title: string,
    field?: keyof T,
    handler?: (item: T) => ReactNode | string
}

interface Props<T> {
    data: T[],
    columns: ITableColumn<T>[]
}

export default function TableData<T>({ data, columns }: Props<T>) {
    return (
        <Table>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    {columns.map((column, index) => {
                        return (<TableHead key={column.title + index}>{column.title}</TableHead>)
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((item, index) => {
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

            </TableBody>
        </Table>
    )
}