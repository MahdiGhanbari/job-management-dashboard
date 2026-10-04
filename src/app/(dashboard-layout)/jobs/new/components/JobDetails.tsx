'use client'

import { TextareaField } from "@/components/common/TextareaField"
import TextField from "@/components/common/TextField"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { BiDollar } from "react-icons/bi"
import { FaBriefcase } from "react-icons/fa"
import { FaRegRectangleList } from "react-icons/fa6"

export default function JobDetails() {
    return (
        <>
            <Card className="w-full select-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FaRegRectangleList size="24" />
                        <span>Job Details</span>
                    </CardTitle>
                    <CardDescription>
                        Provide a clear description of the role and what you're looking for.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Field>
                        <Field orientation="horizontal">
                            <TextareaField label="Description" placeholder="e.g We are looking for a full stack developer with 2+ years of experience in React and Node.js" name="description" required />
                        </Field>
                        <Field orientation="horizontal">
                            <TextField type="number" min="1" max="30" name="experience" label="Experience" placeholder="e.g 2+ years" innerLeftIcon={<FaBriefcase />} required />
                            <TextField type="number" min="1000" max="1000000" name="salary" label="Salary" placeholder="e.g $60,000" innerLeftIcon={<BiDollar />} required />
                        </Field>
                    </Field>
                </CardContent>
            </Card>
        </>
    )
}