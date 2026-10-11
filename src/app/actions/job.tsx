'use server';

import { addJob, deleteJob, getJob, updateJob } from '@/lib/api/jobs';
import { interval } from '@/lib/utils';
import { IJob } from '@/types/job';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { jobSchema } from '../schemas/job.schema';

type State = { success: boolean; message: string };

export async function editJob(_prevState: State, formData: FormData): Promise<State> {
  const rawData = Object.fromEntries(formData.entries());
  const id = String(rawData['id']);
  const result = jobSchema.partial().safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: 'Please check the form fields.',
    };
  }

  await interval(3000);
  try {
    const jobRes = await updateJob(id, result.data);
    if (!jobRes) {
      return { success: false, message: 'Job updated failed' };
    }
  } catch (err) {
    return { success: false, message: 'Somthing went wrong, try later.' };
  }

  redirect('/jobs/' + id);
}

export async function createJob(_prevState: State, formData: FormData): Promise<State> {
  const rawData = Object.fromEntries(formData.entries());
  const result = jobSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: 'Please check the form fields.',
    };
  }

  const newJob: IJob = {
    ...result.data,
    postedAt: new Date().toISOString().split('T')[0],
    status: 'Draft',
  };

  await interval(3000);
  const jobRes = await addJob(newJob);
  if (!jobRes) {
    return { success: false, message: 'Job created failed' };
  }

  redirect('/jobs/' + jobRes.id);
}

export async function removeJob(id: String): Promise<State> {
  try {
    const job = await getJob(id);

    if (job) {
      await deleteJob(id);
      revalidatePath('/jobs');
      return { message: 'Delete the job succesfully.', success: true };
    }
    return { success: false, message: 'Faild to remove the job' };
  } catch (err) {
    return { success: false, message: String(err) };
  }
}
