import { getJobTypes } from "@/lib/api/jobs";
import BaseicInformation from "./components/BasicInformation";

export default async function NewJob() {
    const jobTypes = await getJobTypes()
    
    return (
        <div>
            <span className="font-bold text-xl">Create New Job</span>
            <BaseicInformation jobTypes={jobTypes}/>
        </div>
    )
}