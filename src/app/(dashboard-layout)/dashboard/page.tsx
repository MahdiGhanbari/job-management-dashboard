import { Suspense } from "react";
import StatsCard from "./components/stats/StatsCard";
import StatsCardSkeleton from "./components/stats/StatsCardSkeleton";
import ComingSoon from "@/components/common/ComingSoon";

export default async function Dashboard() {

  return <>
    <div>
      <h3 className="pb-6 font-bold text-xl">Dashboard</h3>
      <Suspense fallback={<StatsCardSkeleton/>}>
        <StatsCard/>
      </Suspense>
      <ComingSoon title="This Section"/>
    </div>

  </>;
}