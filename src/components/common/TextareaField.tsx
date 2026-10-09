import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
  } from "@/components/ui/field"
  import { Textarea } from "@/components/ui/textarea"
import { BaseInputProps } from "@/types/common"
import { useId } from "react"

  
  interface Props extends BaseInputProps {
    desc?: string
  }

  export function TextareaField({error, label, showRequired, desc, ...props}: Props) {
    const id =  useId()
    const isInvalid = !!error?.message
    return (
      <Field data-invalid={isInvalid}>
         <FieldLabel htmlFor={id}>
            {label} {showRequired && <span className="text-destructive">*</span>}
         </FieldLabel>
        <Textarea {...props} aria-invalid={isInvalid}/>
        {desc && <FieldDescription>{desc}</FieldDescription>}
        <div className="min-h-5">
          <FieldError errors={[error]}/>
        </div>
      </Field>
    )
  }
  