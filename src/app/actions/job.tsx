'use server'

import { addJob, addJobDetails, deleteJob, deleteJobDetails, getJob, getJobDetails } from "@/lib/api/jobs"
import { interval } from "@/lib/utils"
import { IJob, IJobDetails, IJobPipeline } from "@/types/job"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type State = { success: boolean, message: string }

export async function createJob(_prevState: State, formData: FormData): Promise<State> {
    // Basic Information
    const title = formData.get('title')
    const department = formData.get('department') as string
    const location = formData.get('location') as string
    const jobType = formData.get('jobType') as string

    // Job Details
    const description = String(formData.get('description'))
    const experience = Number(formData.get('experience'))
    const salary = Number(formData.get('salary'))

    // Requirements & Responsibilities
    const requirements = String(formData.get('requirements'))
    const responsibilities = String(formData.get('responsibilities'))

    if (typeof title !== 'string' || title.length < 3) {
        return {
            success: false,
            message: 'The title should be at least 3 characters.'
        }
    }

    const newJob: IJob = {
        title,
        department,
        location,
        jobType,
        postedAt: new Date().toISOString().split('T')[0],
        status: 'Draft'
    }

    await interval(3000)
    const jobRes = await addJob(newJob)
    if (!jobRes) {
        return { success: false, message: 'Job created failed' }
    }

    const newJobDetails: IJobDetails = {
        jobId: jobRes.id,
        description,
        experience,
        responsibilities,
        requirements,
        salary,
        pipeline: {} as IJobPipeline
    }


    const jobDetailsRes = await addJobDetails(newJobDetails)
    if (!jobDetailsRes) {
        return { success: false, message: 'Job created failed' }
    }
    redirect('/jobs/' + jobRes.id)
}

export async function removeJob(id: String): Promise<State> {
    try {
       const [job, jobDetails] =  await Promise.all([
            getJob(id),
            getJobDetails(id)
        ])


        if(job && jobDetails) {
            await Promise.all([
                deleteJob(id),
                deleteJobDetails(jobDetails.id ?? '') 
            ]) 
            revalidatePath('/jobs')
            return { message: 'Delete the job succesfully.', success: true }
        }
        return { success: false, message: 'Faild to remove the job' }
       
    } catch(err) {
        return { success: false, message: String(err) }
    }
    
}