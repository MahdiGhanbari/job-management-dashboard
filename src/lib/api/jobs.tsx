import { IListResponse } from "@/types/common"
import  { IJob, IJobDetails, IJobFilter } from "@/types/job"
import { cacheLife, cacheTag } from "next/cache"
import { cache } from "react"


const API_URL = process.env.API_URL
type StaticType = 'jobTypes' | 'departments' | 'locations' | 'statuses'


export async function getJobs(params?: IJobFilter): Promise<IListResponse<IJob>> {
    const queryString = new URLSearchParams()
    if(params) {
        Object.keys(params).forEach((field) => {
            if(!['page', 'limit'].includes(field)){
                queryString.set(`${field}:contains`,  String(params[(field as keyof IJobFilter)]))
            }
        })
        queryString.set('_page', String(params?.page))
        queryString.set('_per_page',  String(params.limit))
        
    }
    console.log(queryString.toString())
    const res = await fetch(`${API_URL}/jobs?${queryString.toString()}`)

    if(!res.ok) {
        throw new Error('Failed to fetch jobs')
    }
    return res.json()
}

export async function addJob(data: IJob) {
    const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })

    if(!res.ok) {
        throw new Error('Failed to create new job')
    }
}

export async function getStaticData(type: StaticType): Promise<Record<string, string>[]> {
    'use cache'
    cacheTag(type)
    cacheLife('staticData')

    const res = await fetch(`${API_URL}/${type}`)
    if(!res.ok) {
        throw new Error(`Failed to fetch ${type}`)
    }
    return res.json()
}


export const getJobDetails = cache(async (id: string): Promise<IJobDetails | null> => {
    const res = await fetch(`${API_URL}/jobDetails/${id}`)
    if(res.status === 404) {
        return null
    }
    if(!res.ok) {
        throw new Error('Failed to fetch JobDetails')
    }
    return res.json()
})

