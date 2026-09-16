import type { Metadata } from 'next';

import { buttonVariants} from "@/components/ui/button"
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export const metadata: Metadata = {
  title: 'List of Jobs',
  description: 'You cond search in all Jobs'
};

export default function Jobs() {

  return <div>
    <div className="flex items-center justify-between pb-6">
      <h3 className="font-bold text-xl">Jobs</h3>
        <Link href="/jobs/new" className={buttonVariants({size: 'lg'})}>
          <FaPlus size="12" data-icon="inline-end"/>
          <span>Create New Job</span>
        </Link>
    </div>

  </div>;
}