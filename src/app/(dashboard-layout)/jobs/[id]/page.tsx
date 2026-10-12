import { getJob } from '@/lib/api/jobs';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import JobStatusBadge from '../components/JobStatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LuBriefcaseBusiness, LuClipboardList, LuPencil } from 'react-icons/lu';
import { CiBoxList } from 'react-icons/ci';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { PiBuildingOfficeBold } from 'react-icons/pi';
import { IoLocationOutline } from 'react-icons/io5';
import { FaBriefcase } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cacheLife, cacheTag } from 'next/cache';
import JobSkeleton from './JobSkeleton';

type Props = { params: Promise<{ id: string }> };

function TextToList({ text }: { text: string }): ReactNode {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-indigo-600 marker:text-lg">
      {text
        .split(/\r?\n/)
        .filter(Boolean)
        .map((item, index) => (
          <li key={index}>{item}</li>
        ))}
    </ul>
  );
}

function InfoItem({ children, title, value }: { children: ReactNode; title: string; value: string | number }): ReactNode {
  return (
    <div className="flex items-center gap-8 capitalize p-1">
      <div className="flex gap-5 items-center font-bold w-60">
        <div className="text-xl">{children}</div>
        {title}
      </div>
      <span>{value}</span>
    </div>
  );
}

function JobCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }): ReactNode {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-4 items-center font-bold capitalize text-xl">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-600">{children}</CardContent>
    </Card>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  'use cache'
  const { id } = await params;
  cacheTag(`job-${id}`)
  cacheLife('seconds')

  const res = await getJob(id);
  if (res) {
    return {
      title: res.title + '',
      description: res.description,
    };
  }
  return {};
}

async function Content({ params }: Props) {
  const { id } = await params;
  const data = await getJob(id);
  if (!data) {
    notFound();
  }
  const { title, status, description, requirements, responsibilities, department, location, jobType, experience, salary } = data;

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <div className=" flex gap-4 items-center">
          <h3 className="font-bold text-3xl">{title}</h3>
          <JobStatusBadge className="text-sm " status={status} />
        </div>
        <Link href={`/jobs/${id}/edit`} className={buttonVariants({ size: 'lg' })}>
          <LuPencil size="12" data-icon="inline-end" />
          <span>Edit Job</span>
        </Link>
      </div>

      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-6 flex-2">
          <JobCard title="Job Description" icon={<LuClipboardList />}>
            {description}
          </JobCard>

          <JobCard title="Requirements" icon={<CiBoxList />}>
            <TextToList text={requirements} />
          </JobCard>

          <JobCard title="Responsibilites" icon={<CiBoxList />}>
            <TextToList text={responsibilities} />
          </JobCard>
        </div>
        <div className="flex-1">
          <JobCard title="Job Overview" icon={<IoMdInformationCircleOutline />}>
            <div className="flex flex-col gap-2">
              <InfoItem title="Department" value={department}>
                <PiBuildingOfficeBold />
              </InfoItem>

              <InfoItem title="Location" value={location}>
                <IoLocationOutline />
              </InfoItem>

              <InfoItem title="Job Type" value={jobType}>
                <LuBriefcaseBusiness />
              </InfoItem>

              <InfoItem title="Experience" value={experience + (experience > 1 ? ' years' : 'year')}>
                <FaBriefcase />
              </InfoItem>

              <InfoItem title="Salary" value={'$ ' + salary}>
                <BiDollar />
              </InfoItem>
            </div>
          </JobCard>
        </div>
      </div>
    </div>
  );
}

export default async function JobPage({ params }: Props) {
  return (
    <Suspense fallback={<JobSkeleton/>}>
      <Content params={params}/>
    </Suspense>
  )
 
}
