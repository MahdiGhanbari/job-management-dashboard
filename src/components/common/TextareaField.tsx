import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "@/components/ui/field"
  import { Textarea } from "@/components/ui/textarea"
import { useId } from "react"
import { ITextInputProps } from "./TextField"
  
  interface Props extends ITextInputProps {
    desc?: string
  }

  export function TextareaField({value, placeholder, label, desc, name, required, onChange}: Props) {
    const id =  useId()
    return (
      <Field>
         <FieldLabel htmlFor={id}>
            {label} {required && <span className="text-destructive">*</span>}
         </FieldLabel>
        <Textarea {...{ id, name, placeholder, required, value}} onChange={(e) => onChange?.(e.target.value)} />
        {desc && <FieldDescription>{desc}</FieldDescription>}
      </Field>
    )
  }
  