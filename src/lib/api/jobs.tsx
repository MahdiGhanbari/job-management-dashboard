import  { IJob } from "@/types/job"

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

