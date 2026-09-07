import { FaBriefcase, FaUsers } from "react-icons/fa";
import StatCard from "./components/StatCard";
import { SiGotomeeting } from "react-icons/si";
import { RxLapTimer } from "react-icons/rx";
import { getJobs } from "@/lib/api/jobs";
import { getCandidates } from "@/lib/api/candidates";
import { getDashboard } from "@/lib/api/dashboard";

export default async function Dashboard() {
  const data = {
    title: 'Total active jobs',
    count: 12,
    change: 2 
  }

  return <>
    <div>
      <h3 className="pb-6 font-bold text-xl">Dashboard</h3>

      <div className="flex flex-nowrap gap-6">
        <StatCard className="flex-1" {...data} icon={<FaBriefcase className="text-sky-600"/>} change={-13}/>
        <StatCard className="flex-1" {...data} icon={<FaUsers className="text-violet-600"/>} change={10} unit="%"/>
        <StatCard className="flex-1" {...data} icon={<SiGotomeeting className="text-pink-600"/>} countDesc="Next: 20:00 PM" unit="Days"/>
        <StatCard className="flex-1" {...data} icon={<RxLapTimer className="text-amber-600"/>} change={0}/>
      </div>
    </div>

  </>;
}