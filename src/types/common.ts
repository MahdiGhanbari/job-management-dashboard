import { FieldError, UseFormRegisterReturn } from "react-hook-form"

export interface IListItem<K, V> {
    lable: K
    value: V
}

export interface IQeury {
    page?: number
    limit?: number
}
export interface IListResponse<T> {
    first: number
    prev: number
    next: number
    last: number
    pages: number
    items: number
    data: T[]
}

export interface BaseInputProps extends Partial<UseFormRegisterReturn> {
    value?: any
    label?: string
    placeholder?: string
    className?: string
    error?: FieldError
    showRequired?: boolean
}