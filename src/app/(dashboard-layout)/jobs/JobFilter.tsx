'use client'
import SelectInput from "@/components/common/SelectInput"
import TextField from "@/components/common/TextField"
import { IJobFilter } from "@/types/job"
import { useRouter } from "next/navigation"
import debounce from "debounce"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"


interface Props {
    searchParams: IJobFilter,
    jobTypes: Record<string, string>[]
    departments: Record<string, string>[]
    locations: Record<string, string>[]
    statuses: Record<string, string>[]
}

export default function JobFilter({searchParams, jobTypes, departments, locations, statuses}: Props) {
    const router = useRouter()
    const {
        department,
        location,
        status,
        jobType
    } = searchParams
    const [title, setTitle] = useState(searchParams.title ?? "")

    
    function reload(query: IJobFilter) {
        const newQuery: IJobFilter = {
            ...query,
            page: 1,
          }
        
        const params = new URLSearchParams(
            Object.entries(newQuery).filter(([_, v])=> !!v)
        )
        router.push(`/jobs?${params}`)
    }
    function onChangeFilter(field: keyof IJobFilter, value: string) {
        const newParams = {...searchParams, [field]: value}
        if(searchParams[field] != value) {
            reload(newParams)
        }
    }
    const onChangeTitle = debounce((value) => onChangeFilter ('title', value), 1000)
    
    return (
        <Card >
            <CardContent className="flex justify-between gap-4">
                <TextField value={title ?? ''} placeholder="Title" label="Title" onChange={({target:{value}})=> {setTitle(value); onChangeTitle(value)}}/>
                <SelectInput value={department ?? ''} items={departments} label="Department" onValueChange={(value) => onChangeFilter ('department', value)} clearable/>
                <SelectInput value={location ?? ''} items={locations} label="Location" onValueChange={(value) => onChangeFilter ('location', value)} clearable/>
                <SelectInput value={jobType ?? ''}  items={jobTypes} label="Job Type" onValueChange={(value) => onChangeFilter ('jobType', value)} clearable/>
                <SelectInput value={status ?? ''} items={ statuses} label="Status" onValueChange={(value) => onChangeFilter ('status', value)} clearable/>
            </CardContent>
        </Card>
    )
}