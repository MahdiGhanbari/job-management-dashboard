'use clinet'
function StatCardSkeleton() {
    return <div className="flex flex-1 flex-col gap-4 border border-gray-200 rounded-lg p-5 select-none animate-pulse">
        <div className="flex justify-between">
            <div className="h-3  w-32 rounded bg-gray-200"></div>
            <div className="size-6 rounded-full bg-gray-200"></div>
        </div>
   
        <div className="flex gap-4 items-baseline">
            <div className="w-15 h-8 rounded bg-gray-200"></div>
            <div className="w-20 h-2 rounded bg-gray-200"></div>
            <div className="w-15 h-2 rounded bg-gray-200"></div>
        </div>
    </div>
}

export default function () {
    return <div className="flex flex-nowrap gap-6">
        {
            Array.from({length: 4})
            .map((_, index)=> <StatCardSkeleton key={index}/>)
        }
    </div>
}