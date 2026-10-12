import { getStaticData } from '@/lib/api/jobs';
import JobForm from '../components/JobForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaRegRectangleList } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import { LuUserRound } from 'react-icons/lu';
import JobBannerItem from '../components/JobBannerItem';

export default async function NewJob() {
  const [jobTypes, locations, departments] = await Promise.all([getStaticData('jobTypes'), getStaticData('locations'), getStaticData('departments')]);

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-bold text-3xl">Create New Job</h3>
        <div className="text-gray-500 mt-1">Add the job details below to attract the best talent</div>
      </div>
      <div className="flex gap-4">
        <div className="flex-2">
          <JobForm {...{ jobTypes, locations, departments }} />
        </div>
        <Card className="flex-1 p-4 bg-indigo-50/60">
          <CardHeader>
            <img className="w-auto max-w-sm mx-auto" src="/images/create_job.png" />
            <CardTitle className="text-3xl font-bold">Create a greate opportunity</CardTitle>
            <CardDescription className="text-xl mt-6">
              A well-described job attracts the right <br />
              candidates and saves you time.
            </CardDescription>
            <CardContent className="flex flex-col mt-12 gap-6">
              <JobBannerItem title="Clear job details" desc="Help candidates understand the role" icon={<FaRegRectangleList />} />
              <JobBannerItem title="Better matches" desc="Find the right talent faster" icon={<LuUserRound />} />
              <JobBannerItem title="Save time" desc="Manage everything in one place" icon={<IoTimeOutline />} />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
