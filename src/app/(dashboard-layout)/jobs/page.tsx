import type { Metadata } from 'next';
import { FaPlus } from "react-icons/fa";
import JobList from './JobList';
import { getJobs, getStaticData } from '@/lib/api/jobs';
import JobFilter from './JobFilter';
import { IJobFilter } from '@/types/job';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'List of Jobs',
  description: 'You cond search in all Jobs'
};

interface Props {
  searchParams: Promise<IJobFilter>
}

export default async function Jobs({ searchParams }: Props) {
  const params = await searchParams
  const jobs = await getJobs(params)
  const [jobTypes, locations, departments, statuses] = await Promise.all([
    getStaticData('jobTypes'),
    getStaticData('locations'),
    getStaticData('departments'),
    getStaticData('statuses')
  ])

  return <div>
    <div className="flex items-center justify-between pb-6">
      <h3 className="font-bold text-xl">Jobs</h3>

      <Link href="/jobs/new" className={buttonVariants({ size: 'lg' })}>
        <FaPlus size="12" data-icon="inline-end" />
        <span>Create New Job</span>
      </Link>

    </div>
    <JobFilter searchParams={params} {...{ jobTypes, locations, departments, statuses }} />
    <JobList data={jobs} searchParams={params} />

  </div>;
}