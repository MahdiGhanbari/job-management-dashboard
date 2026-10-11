import { getJob, getStaticData } from "@/lib/api/jobs"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import JobForm from "../../components/JobForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {params: Promise<{id: string}>}

export async function  generateMetadata({params}: Props): Promise<Metadata> {
    const {id} = await params
    const res = await getJob(id)
    
    if(res) {
        return {
            title: `Edit: ${res.title}`,
            description: res.description
        }
    }
    return {}
}

export default async function EditJob({params}: Props) {
    const {id} = await params
    const data = await getJob(id)
    if(!data) {
        notFound()
    }
    const [jobTypes, locations, departments] = await Promise.all([
        getStaticData('jobTypes'),
        getStaticData('locations'),
        getStaticData('departments')
    ])


    return (
        <div>
            <div className="mb-6">
                <h3 className="font-bold text-xl">Edit Job</h3>
                <div className="text-gray-500 mt-1">Add the job details below to attract the best talent</div>
            </div>
            <div className="flex gap-4">
                <div className="flex-2">
                    <Suspense fallback={<div>...</div>}>

                        <JobForm {...{ jobTypes, locations, departments, id }} editMode defaultValues={data} />
                    </Suspense>
                </div>
                <Card className="flex-1 p-4 bg-indigo-50/60">
                    <CardHeader>
                        <img className="w-auto max-w-sm mx-auto" src="/images/create_job.png" />
                        <CardTitle className="text-3xl font-bold">
                            Create a greate opportunity
                        </CardTitle>
                        <CardDescription className="text-xl mt-6">
                            A well-described job attracts the right <br />
                            candidates and saves you time.
                        </CardDescription>
                        <CardContent className="flex flex-col mt-12 gap-6">
                            {/* <BannerItem title="Clear job details" desc="Help candidates understand the role" Icon={FaRegRectangleList}/>
                            <BannerItem title="Better matches" desc="Find the right talent faster" Icon={LuUserRound }/>
                            <BannerItem title="Save time" desc="Manage everything in one place" Icon={IoTimeOutline}/> */}
                        </CardContent>
                    </CardHeader>
                </Card>


            </div>
        </div>
    )
    
}