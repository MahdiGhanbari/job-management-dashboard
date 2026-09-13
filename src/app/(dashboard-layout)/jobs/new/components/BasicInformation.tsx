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
import { Field, FieldError } from "@/components/ui/field"
import { useActionState, useState } from "react"

import { FaBriefcase, FaSpinner } from "react-icons/fa"
import { MdOutlineFactCheck } from "react-icons/md"
import { createJob } from "@/app/actions/job"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

export default function BaseicInputs() {
    const [departmentSelected, setDepartmentSelected] = useState<string | null>(null)
    const [locattionSelected, setLocattionSelectedd] = useState<string | null>(null)
    const [jobTypeSelected, setJobTypeSelected] = useState<string | null>(null)
    const departments = [
        { value: "engineering", label: "Engineering" },
        { value: "product", label: "Product" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
        { value: "sales", label: "Sales" },
        { value: "human-resources", label: "Human Resources" },
        { value: "finance", label: "Finance" },
        { value: "customer-support", label: "Customer Support" },
        { value: "operations", label: "Operations" },
    ];

    const locations = [
        { value: "remote", label: "Remote" },
        { value: "new-york", label: "New York, NY" },
        { value: "san-francisco", label: "San Francisco, CA" },
        { value: "austin", label: "Austin, TX" },
        { value: "seattle", label: "Seattle, WA" },
        { value: "boston", label: "Boston, MA" },
        { value: "chicago", label: "Chicago, IL" },
    ];

    const jobTypes = [
        { value: "full-time", label: "Full-time" },
        { value: "part-time", label: "Part-time" },
        { value: "contract", label: "Contract" },
        { value: "internship", label: "Internship" },
        { value: "temporary", label: "Temporary" },
    ];
    const [state, action, pending] = useActionState(createJob, { success: false, message: '' })

    return (
        <form action={action}>

            <Card className="w-full max-w-sm select-none">
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
                    <Field>
                        <Button type="submit" disabled={pending} >
                            {pending && <FaSpinner className={clsx({ 'animate-spin': pending })} />}

                            submit
                        </Button>
                        <FieldError>
                            {state.message}
                        </FieldError>
                    </Field>
                </CardContent>

            </Card>
        </form>
    )
}