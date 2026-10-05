import { ReactNode } from "react";
import { Field, FieldLabel } from "../ui/field";
import { InputGroupAddon } from "../ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import clsx from "clsx";


interface Props<T> {
    items: T[],
    value?: any,
    titleField?: keyof T,
    valueField?: keyof T,
    onValueChange?: (value: any) => void,
    required?: boolean,
    label?: string
    placeholder?: string,
    innerLeftIcon?: ReactNode,
    name?: string
    clearable?: boolean
    className?: string
}

export default function SelectInput<T extends Record<string, any>>({ items, value, onValueChange, required, label, placeholder, innerLeftIcon, name, titleField ='label' , valueField= 'value' , clearable, className }: Props<T>) {

    return (
        <Field className={className}>
            <FieldLabel >{label} {required && <span className="text-destructive">*</span>}</FieldLabel>
            <Select {...{ value, name, required, onValueChange }}>

                <SelectTrigger onClick={(e)=> e.stopPropagation()} className={clsx("w-full", { 'pl-0': innerLeftIcon || clearable })} >
                    <SelectValue placeholder={placeholder} />

                    <InputGroupAddon align="inline-start">
                        {innerLeftIcon}
                    </InputGroupAddon>

                </SelectTrigger>

                <SelectContent alignItemWithTrigger>
                    <SelectGroup>
                        {clearable && <SelectItem key="clear" value={''}>No Select</SelectItem> }
                        {clearable &&<SelectLabel>Items</SelectLabel>}
                        {items.map((item) => {
                            const itemValue = item[valueField];
                            const itemTitle = String(item[titleField]);
                            return (
                            <SelectItem key={itemValue} value={itemValue}>
                                {itemTitle}
                            </SelectItem>
                            )}
                        )}
                    </SelectGroup>
                </SelectContent>

            </Select>
        </Field>
    )
}