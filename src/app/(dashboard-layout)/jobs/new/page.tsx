import { getStaticData } from "@/lib/api/jobs";
import NewJobForm from "./components/NewJobForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons";
import { FaRegRectangleList } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";


function BannerItem({title, desc, Icon}: {title: string, desc: string, Icon: IconType}) {
    
    return (
        <div className="flex gap-4">
            <Icon size={46} className="bg-indigo-100 p-2 rounded-xl" />
            <div>
                <h2 className="font-bold text-lg">{title}</h2>
                <h3 className="text-gray-500">{desc}</h3>
            </div>
        </div>
    )
}

export default async function NewJob() {

    const [jobTypes, locations, departments] = await Promise.all([
        getStaticData('jobTypes'),
        getStaticData('locations'),
        getStaticData('departments')
    ])


    return (
        <div>
            <div className="mb-6">
                <h3 className="font-bold text-xl">Create New Job</h3>
                <div className="text-gray-500 mt-1">Add the job details below to attract the best talent</div>
            </div>
            <div className="flex gap-4">
                <div className="flex-2">
                    <NewJobForm {...{ jobTypes, locations, departments }} />
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
                            <BannerItem title="Clear job details" desc="Help candidates understand the role" Icon={FaRegRectangleList}/>
                            <BannerItem title="Better matches" desc="Find the right talent faster" Icon={LuUserRound }/>
                            <BannerItem title="Save time" desc="Manage everything in one place" Icon={IoTimeOutline}/>
                        </CardContent>
                    </CardHeader>
                </Card>


            </div>
        </div>
    )
}