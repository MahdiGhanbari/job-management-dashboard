
import { useId } from "react"
import { Field, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

interface Props { label: string, placeholder: string, innerLeftIcon: React.ReactNode, required?: boolean, name?: string }

export default function TextField({ label, placeholder, innerLeftIcon, required, name }: Props) {
    const id = useId()
    return (
        <Field >
            <FieldLabel htmlFor={id}>
                {label} {required && <span className="text-destructive">*</span>}
            </FieldLabel>
            <InputGroup >
                <InputGroupInput id={id} placeholder={placeholder} required={required} name={name}/>
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