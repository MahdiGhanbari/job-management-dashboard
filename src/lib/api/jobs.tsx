import { IListResponse } from "@/types/common"
import  { IJob, IJobDetails, IJobFilter } from "@/types/job"
import { cacheLife, cacheTag } from "next/cache"
import { cache } from "react"
import { interval } from "../utils"


const API_URL = process.env.API_URL
type StaticType = 'jobTypes' | 'departments' | 'locations' | 'statuses'


export async function getJobs(params?: IJobFilter): Promise<IListResponse<IJob>> {
    await interval(1000)
    const queryString = new URLSearchParams()
    if(params) {
        queryString.set('_per_page',  String(params?.limit || 5))
        queryString.set('_page', String(params?.page || 1))
        Object.keys(params).forEach((field) => {
            if(!['page', 'limit'].includes(field)){
                queryString.set(`${field}:contains`,  String(params[(field as keyof IJobFilter)]))
            }
        })
        
    }

    const res = await fetch(`${API_URL}/jobs?${queryString.toString()}`)

    if(!res.ok) {
        throw new Error('Failed to fetch jobs')
    }
    return res.json()
}


export async function addJob(data: IJob): Promise<IJob> {
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
    return res.json()
}

export async function deleteJob(id: String): Promise<boolean> {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE', 
    })

    if(!res.ok) {
        throw new Error('Failed to delete the job')
    }
    return true
}


export async function addJobDetails(data: IJobDetails): Promise<IJobDetails> {
    const res = await fetch(`${API_URL}/jobDetails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    if(!res.ok) {
        throw new Error('Failed to create new Job Details')
    }
    return res.json()
}

export async function deleteJobDetails(id: String): Promise<boolean> {
    const res = await fetch(`${API_URL}/jobDetails/${id}`, {
        method: 'DELETE', 
    })

    if(!res.ok) {
        throw new Error('Failed to delete the job details')
    }
    return true
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

export async function getJob (id: String): Promise<IJob | null>  {
    const res = await fetch(`${API_URL}/jobs/${id}`)
    if(!res.ok) {
        throw new Error('Failed to fetch job')
    }
    return res.json()
}


export const getJobDetails = cache(async (id: String): Promise<IJobDetails | null> => {
    const res = await fetch(`${API_URL}/jobDetails?jobId:eq=${id}`)
    if(!res.ok ) {
        throw new Error('Failed to fetch JobDetails')
    }
    const data: IJobDetails[] = await res.json()

    return data[0] ?? null
})

