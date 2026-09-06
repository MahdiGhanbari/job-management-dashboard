import clsx from "clsx";
type Props = { title: string, icon: React.ReactNode, count: string | number, countDesc?: string, change: number, unit?: string, className?: string }

export default function StatCard({ title, icon, count, countDesc, change, unit, className }: Props) {

    let statClasses= 'bg-gray-50 text-gray-600'
    if(change != 0) {
        statClasses = change > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
    }

    return <div className={clsx("flex flex-col gap-2 border border-gray-200 rounded-lg p-5 select-none", className)}>
        <div className="flex items-center justify-between gap-12">
            <span className="text-gray-500 text-sm font-medium">{title}</span>
            <span className="text-lg">{icon}</span>
        </div>
        <div className="flex items-baseline gap-3 text-sm">
            <span className="font-bold text-2xl">{count}</span>
            {countDesc && <span className="text-gray-400 ">{countDesc}</span>}
            <div className={clsx("px-1 rounded flex gap-1", statClasses)}>
                {change} 
                {unit &&<span>{unit}</span>}
            </div>
        </div>
    </div>
}