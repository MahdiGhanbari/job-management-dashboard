import  { IJob } from "@/types/job"

const API_URL = process.env.API_URL


export async function getJobs(): Promise<IJob[]> {
    const res = await fetch(`${API_URL}/jobs`)

    if(!res.ok) {
        throw new Error('Failed to fetch jobs')
    }
    return res.json()
}

