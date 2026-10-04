'use client'
import SelectInput from "@/components/common/SelectInput"
import TextField from "@/components/common/TextField"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { useState } from "react"
import { FaBriefcase } from "react-icons/fa"
import { MdOutlineFactCheck } from "react-icons/md"

interface Props {
    jobTypes: Record<string,string>[],
    departments: Record<string,string>[],
    locations: Record<string,string>[],
}

export default function BaseicInputs({jobTypes, departments, locations}:Props) {
    const [departmentSelected, setDepartmentSelected] = useState<string | null>(null)
    const [locattionSelected, setLocattionSelectedd] = useState<string | null>(null)
    const [jobTypeSelected, setJobTypeSelected] = useState<string | null>(null)

    return (
   

            <Card className="w-full select-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MdOutlineFactCheck size="24" />
                        <span>Basic Information</span>
                    </CardTitle>
                    <CardDescription>
                        Start with the essential details about the position
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Field>

                        <Field orientation="horizontal">
                            <TextField name="title" label="Job Title" placeholder="e.g Senior Frontend Developer" innerLeftIcon={<FaBriefcase />} required />
                            <SelectInput name="department" label="Department" items={departments} value={departmentSelected} onValueChange={setDepartmentSelected} required />
                        </Field>
                        <Field orientation="horizontal">
                            <SelectInput name="location" label="Location" items={locations} value={locattionSelected} onValueChange={setLocattionSelectedd} placeholder="e.g Tehran, Iran" innerLeftIcon={<FaBriefcase />} required />
                            <SelectInput name="jobType" label="Job Type" items={jobTypes} value={jobTypeSelected} onValueChange={setJobTypeSelected} required />
                        </Field>

                    </Field>
                </CardContent>

            </Card>
 
    )
}