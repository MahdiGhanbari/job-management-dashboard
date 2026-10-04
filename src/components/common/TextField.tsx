
import { useId } from "react"
import { Field, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import clsx from "clsx"

export interface ITextInputProps {
    value?: string | number,
    label?: string,
    placeholder?: string,
    required?: boolean, 
    name?: string,
    className?: string,
    onChange?: (value: string) => void
}

interface Props extends ITextInputProps {
    innerLeftIcon?: React.ReactNode,
    type?: string
    min?: number | string
    max?: number | string
}


export default function TextField({ value, label, placeholder, innerLeftIcon, required, name, className, type, min, max, onChange }: Props) {
    const id = useId()
    return (
        <Field className={clsx(className)}>
            <FieldLabel htmlFor={id}>
                {label} {required && <span className="text-destructive">*</span>}
            </FieldLabel>
            <InputGroup >
                <InputGroupInput {...{ id, name, placeholder, required, value, type , min, max}} onChange={(e) => onChange?.(e.target.value)} />
                {
                    innerLeftIcon &&
                    <InputGroupAddon align="inline-start">
                        {innerLeftIcon}
                    </InputGroupAddon>
                }
            </InputGroup>
        </Field>
    )
}