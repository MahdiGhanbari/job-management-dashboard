'use server'

import { addJob } from "@/lib/api/jobs"
import { interval } from "@/lib/utils"
import { IJob } from "@/types/job"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type State = {success: boolean, message: string}

export async function  createJob(_prevState: State,  formData: FormData): Promise<State> { 
    const title = formData.get('title') 
    const department = formData.get('department') as string
    const location = formData.get('location')as string
    const jobType = formData.get('jobType') as string
    
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
    await addJob(newJob)
    revalidatePath('/dashboard')
    redirect('/dashboard')
    // return {success: true, message: 'Job created successfully'}

}