import  { IJob, IJobDetails } from "@/types/job"
import { cacheLife, cacheTag } from "next/cache"
import { cache } from "react"
import { IListResponse, IQeury } from "./type"

const API_URL = process.env.API_URL


export async function getJobs(params?: IQeury): Promise<IListResponse<IJob>> {
    const queryString = new URLSearchParams()
    if(params) {
        queryString.set('_page', String(params?.page))
        queryString.set('_per_page',  String(params.limit))
    }
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

export async function getJobTypes(): Promise<Record<string, string>[]> {
    'use cache'
    cacheTag('jobTypes')
    cacheLife('staticData')

    const res = await fetch(`${API_URL}/jobTypes`)
    if(!res.ok) {
        throw new Error('Failed to fetch JobTypes')
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

