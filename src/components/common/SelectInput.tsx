import { ReactNode } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { InputGroupAddon } from "../ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import clsx from "clsx";
import { BaseInputProps } from "@/types/common";


interface Props<T> extends BaseInputProps {
    items: T[],
    titleField?: keyof T,
    valueField?: keyof T,
    innerLeftIcon?: ReactNode,
    clearable?: boolean
    className?: string
    onValueChange?: (value: any) => void
}

export default function SelectInput<T extends Record<string, any>>({ items, name, showRequired, onChange, onValueChange, required, error, label, placeholder, innerLeftIcon, titleField = 'label', valueField = 'value', clearable, className, ...props }: Props<T>) {
    const isInvalid = !!error?.message
    return (
        <Field className={className} data-invalid={isInvalid}>
            <FieldLabel >{label} {showRequired && <span className="text-destructive">*</span>}</FieldLabel>
            <Select {...props} aria-invalid={isInvalid} onValueChange={(value) => {
                onChange?.(value )
                onValueChange?.(value)
            }
            }>

                <SelectTrigger onClick={(e) => e.stopPropagation()} className={clsx("w-full", { 'pl-0': innerLeftIcon || clearable })} >
                    <SelectValue placeholder={placeholder} />

                    <InputGroupAddon align="inline-start">
                        {innerLeftIcon}
                    </InputGroupAddon>

                </SelectTrigger>

                <SelectContent alignItemWithTrigger>
                    <SelectGroup>
                        {clearable && <SelectItem key="clear" value={''}>No Select</SelectItem>}
                        {clearable && <SelectLabel>Items</SelectLabel>}
                        {items.map((item) => {
                            const itemValue = item[valueField];
                            const itemTitle = String(item[titleField]);
                            return (
                                <SelectItem key={itemValue} value={itemValue}>
                                    {itemTitle}
                                </SelectItem>
                            )
                        }
                        )}
                    </SelectGroup>
                </SelectContent>

            </Select>
            <div className="min-h-5">
                <FieldError errors={[error]} />
            </div>
        </Field>
    )
}