'use client'
import SelectInput from "@/components/common/SelectInput"
import TextField from "@/components/common/TextField"
import { IJobFilter } from "@/types/job"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"

interface Props {
    searchParams: IJobFilter,
    jobTypes: Record<string, string>[]
    departments: Record<string, string>[]
    locations: Record<string, string>[]
    statuses: Record<string, string>[]
}

export default function JobFilter({searchParams, jobTypes, departments, locations, statuses}: Props) {
    const router = useRouter()
    const [params, setParams] = useState<IJobFilter>(searchParams)
    
    function reload(qeury: IJobFilter) {
        qeury.page = 1
        const params = new URLSearchParams(Object.entries(qeury))
        router.push(`/jobs?${params}`)
    }
    function onChangeDepartment(field: keyof IJobFilter, value: string) {
        const newParams = {...searchParams, [field]: value}
        setParams(newParams)
        if(searchParams[field] != value) {
            reload(newParams)
        }
    }
    const onChangeTitle = useDebouncedCallback((value) => onChangeDepartment ('title', value), 500)
    
    return (
        <div className="flex justify-between gap-4">
            <TextField placeholder="Title" label="Title" onChange={onChangeTitle}/>
            <SelectInput value={params.department} items={departments} label="Department" onValueChange={(value) => onChangeDepartment ('department', value)} clearable/>
            <SelectInput value={params.location} items={locations} label="Location" onValueChange={(value) => onChangeDepartment ('location', value)} clearable/>
            <SelectInput value={params.jobType}  items={jobTypes} label="Job Type" onValueChange={(value) => onChangeDepartment ('jobType', value)} clearable/>
            <SelectInput value={params.status} items={ statuses} label="Status" onValueChange={(value) => onChangeDepartment ('status', value)} clearable/>
        </div>
    )
}