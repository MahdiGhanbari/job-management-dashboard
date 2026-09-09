import { FaBriefcase, FaUsers } from "react-icons/fa";
import StatCard from "./StatCard";
import { SiGotomeeting } from "react-icons/si";
import { RxLapTimer } from "react-icons/rx";
import { getStats } from "@/lib/api/dashboard";


export default async function StatsCard() {
    const data = await getStats()
  
    return <div className="flex flex-nowrap gap-6">
      <StatCard className="flex-1" title='Total active jobs' {...data.jobs} icon={<FaBriefcase className="text-sky-600"/>} />
      <StatCard className="flex-1" title="Total candidates" {...data.candidates} icon={<FaUsers className="text-violet-600"/>} unit="%"/>
      <StatCard className="flex-1" title="Interviews Today" {...data.interviews} icon={<SiGotomeeting className="text-pink-600"/>} countDesc="Next:" unit="Days"/>
      <StatCard className="flex-1" title="Time to Hire" {...data.timeToHire} icon={<RxLapTimer className="text-amber-600"/>} />
    </div>
  }