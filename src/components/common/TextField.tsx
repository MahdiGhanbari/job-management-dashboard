
import { useId } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import clsx from "clsx"
import { BaseInputProps } from "@/types/common"


interface Props extends BaseInputProps {
    innerLeftIcon?: React.ReactNode,
    type?: string
}


export default function TextField({ error, label,  innerLeftIcon, showRequired, className, ...props }: Props) {

    const id = useId()
    const isInvalid = !!error?.message
    return (
        <Field className={clsx(className)} data-invalid={isInvalid}>
            <FieldLabel htmlFor={id}>
                {label} {showRequired && <span className="text-destructive">*</span>}
            </FieldLabel>
            <InputGroup >
                <InputGroupInput {...props} />
                {
                    innerLeftIcon &&
                    <InputGroupAddon align="inline-start">
                        {innerLeftIcon}
                    </InputGroupAddon>
                }
            </InputGroup>
            <div className="min-h-5">
                <FieldError errors={[error]}/>
            </div>
        </Field>
    )
}