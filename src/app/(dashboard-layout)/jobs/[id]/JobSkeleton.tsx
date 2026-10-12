import { Skeleton } from "@/components/ui/skeleton";


function CardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <Skeleton className="mb-5 h-5 w-36" />

      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <Skeleton key={i} className={`h-3.5 ${i % 2 === 0 ? 'w-full' : 'w-4/5'}`} />
        ))}
      </div>
    </section>
  );
}

export default function JobSkeleton() {
  return (
    <div role="status" aria-label="Loading job details" className="space-y-6">

      <div className="flex justify-between items-center space-y-4">
        <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-56" />
            <Skeleton className="h-3 w-10" />
        </div>

        <Skeleton className="h-10 w-20 max-w-full" />
      </div>


      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <CardSkeleton rows={3} />
          <CardSkeleton rows={5} />
          <CardSkeleton rows={5} />
        </div>

        <div className="space-y-4">
          <CardSkeleton rows={6} />
          <CardSkeleton rows={3} />
          <CardSkeleton rows={2} />
        </div>
      </div>

      <span className="sr-only">Please wait...</span>
    </div>
  )
}
