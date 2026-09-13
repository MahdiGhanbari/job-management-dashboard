import { ReactNode } from "react";
import { Field, FieldLabel } from "../ui/field";
import { InputGroupAddon } from "../ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import clsx from "clsx";

interface Props {
    items: { value: any, label: string }[],
    value: any,
    onValueChange: (value: any) => void,
    required?: boolean,
    label?: string
    placeholder?: string,
    innerLeftIcon?: ReactNode,
    name?: string
}

export default function SelectInput({items, value, onValueChange, required, label, placeholder, innerLeftIcon, name}: Props) {

    return (
        <Field>
            <FieldLabel >{label} {required && <span className="text-destructive">*</span>}</FieldLabel>
            <Select {...{items, value, name, required, onValueChange}}>
                
                <SelectTrigger className={clsx("w-full max-w-48", {'pl-0': innerLeftIcon})}>
                    <SelectValue placeholder={placeholder} />
                    <InputGroupAddon align="inline-start">
                        {innerLeftIcon}
                    </InputGroupAddon>
                </SelectTrigger>

                <SelectContent alignItemWithTrigger>
                    <SelectGroup>
                        {/* <SelectLabel>Fruits</SelectLabel> */}
                        {items.map((item) => (
                            <SelectItem key={item.label} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>

            </Select>
        </Field>
    )
}