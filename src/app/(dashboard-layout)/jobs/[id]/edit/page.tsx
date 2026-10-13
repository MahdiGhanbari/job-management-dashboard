import { getJob, getStaticData } from '@/lib/api/jobs';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import JobForm from '../../components/JobForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaRegRectangleList } from 'react-icons/fa6';
import { LuUserRound } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import JobBannerItem from '../../components/JobBannerItem';
import { cacheLife, cacheTag } from 'next/cache';
import JobFormSkeleton from '../../components/JobFormSkeleton';

type Props = { params: Promise<{ id: string }> };

async function Content({ params }: Props) {
  const { id } = await params;
  const data = await getJob(id);
  if (!data) {
    notFound();
  }
  const [jobTypes, locations, departments] = await Promise.all([getStaticData('jobTypes'), getStaticData('locations'), getStaticData('departments')]);

  return <JobForm {...{ jobTypes, locations, departments, id }} editMode defaultValues={data} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  'use cache';
  const { id } = await params;
  cacheTag(`job-${id}`);
  cacheLife('seconds');

  const res = await getJob(id);

  if (res) {
    return {
      title: `Edit: ${res.title}`,
      description: res.description,
    };
  }
  return {};
}

export default async function EditJob({ params }: Props) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="font-bold text-3xl">Edit Job</h3>
        <div className="text-gray-500 mt-1">Add the job details below to attract the best talent</div>
      </div>
      <div className="flex gap-4">
        <div className="flex-2">
          <Suspense fallback={<JobFormSkeleton/>}>
            <Content params={params} />
          </Suspense>
        </div>
        <Card className="flex-1 p-4 bg-indigo-50/60">
          <CardHeader>
            <img className="w-auto max-w-sm mx-auto" src="/images/edit_job.png" />
            <CardTitle className="text-3xl font-bold">Keep your job up to date</CardTitle>
            <CardDescription className="text-xl mt-6">
              Make changes to attract the right <br />
              candidates and keep your team aligned.
            </CardDescription>
            <CardContent className="flex flex-col mt-12 gap-6">
              <JobBannerItem title="Accurate job details" desc="Keep role information clear and current." icon={<FaRegRectangleList />} />
              <JobBannerItem title="Better candidates" desc="Help the right talent understand the opportunity." icon={<LuUserRound />} />
              <JobBannerItem title="Stay organized" desc="Update the requirments and deadlines in one place." icon={<IoTimeOutline />} />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
