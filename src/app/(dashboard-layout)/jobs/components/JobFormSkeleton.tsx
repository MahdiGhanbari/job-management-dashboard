import { Skeleton } from '@/components/ui/skeleton';

function FormFieldSkeleton({ textarea = false }: { textarea?: boolean }) {
  return (
    <div className="space-y-2 flex-1">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className={textarea ? 'h-32 w-full' : 'h-10 w-full'} />
    </div>
  );
}

function FormCardSkeleton({ children }: { titleWidth?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-5">
      <div className="space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3 w-64 max-w-full" />
      </div>

      {children}
    </section>
  );
}

export default function JobFormSkeleton() {
  return (
    <div className="space-y-4">
      <FormCardSkeleton>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormFieldSkeleton />
          <FormFieldSkeleton />
          <FormFieldSkeleton />
          <FormFieldSkeleton />
        </div>
      </FormCardSkeleton>

      <FormCardSkeleton>
        <div className="space-y-5">
          <FormFieldSkeleton textarea />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormFieldSkeleton />
            <FormFieldSkeleton />
          </div>
        </div>
      </FormCardSkeleton>

      <FormCardSkeleton>
        <FormFieldSkeleton textarea />
      </FormCardSkeleton>
    </div>
  );
}
