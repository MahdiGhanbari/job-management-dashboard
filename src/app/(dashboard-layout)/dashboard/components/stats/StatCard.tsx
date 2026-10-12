import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import clsx from 'clsx';
type Props = {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  countDesc?: string;
  changes?: number;
  unit?: string;
  className?: string;
};

export default function StatCard({ title, icon, value, countDesc, changes, unit, className }: Props) {
  let statClasses = 'bg-gray-50 text-gray-600';
  if (changes && changes != 0) {
    statClasses = changes > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600';
  }

  return (
    <Card className={clsx('select-none', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-12">
          <span className="text-gray-500 text-sm font-medium">{title}</span>
          <span className="text-lg">{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-baseline gap-3 text-sm">
        <span className="font-bold text-2xl">{value}</span>
        {countDesc && <span className="text-gray-400 ">{countDesc}</span>}
        <div className={clsx('px-1 rounded flex gap-1', statClasses)}>
          {changes}
          {unit && <span>{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
