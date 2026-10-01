import { getStaticData } from "@/lib/api/jobs";
import BaseicInformation from "./components/BasicInformation";

export default async function NewJob() {

    const [jobTypes, locations, departments] = await Promise.all([
        getStaticData('jobTypes'),
        getStaticData('locations'),
        getStaticData('departments')
    ])

    
    return (
        <div>
            <span className="font-bold text-xl">Create New Job</span>
            <BaseicInformation {...{jobTypes, locations, departments}}/>
        </div>
    )
}