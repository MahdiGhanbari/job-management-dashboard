
import { useId } from "react"
import { Field, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import clsx from "clsx"

interface Props { value?: string | number, label?: string, placeholder?: string, innerLeftIcon?: React.ReactNode, required?: boolean, name?: string, className?: string, onChange?: (value: string) => void }

export default function TextField({ value, label, placeholder, innerLeftIcon, required, name, className, onChange = ()=>{} }: Props) {
    const id = useId()
    return (
        <Field className={clsx(className)}>
            <FieldLabel htmlFor={id}>
                {label} {required && <span className="text-destructive">*</span>}
            </FieldLabel>
            <InputGroup >
                <InputGroupInput  {...{id,name, placeholder, required, value}} onChange={(e)=> onChange(e.target.value)}/>
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