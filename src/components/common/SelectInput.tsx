import { MouseEvent, MouseEventHandler, ReactNode } from "react";
import { Field, FieldLabel } from "../ui/field";
import { InputGroupAddon } from "../ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import clsx from "clsx";
import { MdOutlineClose } from "react-icons/md";
import { Button } from "../ui/button";

interface Props {
    items: Record<any, any>[],
    value?: any,
    titleField?: string,
    valueField?: string,
    onValueChange?: (value: any) => void,
    required?: boolean,
    label?: string
    placeholder?: string,
    innerLeftIcon?: ReactNode,
    name?: string
    clearable?: boolean
}

export default function SelectInput({ items, value, onValueChange, required, label, placeholder, innerLeftIcon, name, titleField = 'label', valueField = 'value', clearable }: Props) {

    return (
        <Field>
            <FieldLabel >{label} {required && <span className="text-destructive">*</span>}</FieldLabel>
            <Select {...{ value, name, required, onValueChange }}>

                <SelectTrigger onClick={(e)=> e.stopPropagation()} className={clsx("w-full max-w-48", { 'pl-0': innerLeftIcon || clearable })} >
                    <SelectValue placeholder={placeholder} />

                    <InputGroupAddon align="inline-start">
                        {innerLeftIcon}
                    </InputGroupAddon>

                </SelectTrigger>

                <SelectContent alignItemWithTrigger>
                    <SelectGroup>
                        {clearable && <SelectItem key="clear" value={''}>No Select</SelectItem> }
                        {clearable &&<SelectLabel>Items</SelectLabel>}
                        {items.map((item) => (
                            <SelectItem key={item[titleField]} value={item[valueField]}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>

            </Select>
        </Field>
    )
}