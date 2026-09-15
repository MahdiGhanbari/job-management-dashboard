import  { IJob } from "@/types/job"
import { cacheLife, cacheTag } from "next/cache"

const API_URL = process.env.API_URL


export async function getJobs(): Promise<IJob[]> {
    const res = await fetch(`${API_URL}/jobs`)

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

