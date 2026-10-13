import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { MdOutlineConstruction } from 'react-icons/md';
import Link from 'next/link';
import clsx from 'clsx';

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center ">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <div className="mb-3 flex size-16 items-center justify-center rounded-2xl bg-indigo-50">
            <MdOutlineConstruction className="size-9 text-indigo-600" />
          </div>
          <span className="text-xs text-slate-500 mt-1">{title}</span>

          <CardTitle className="text-2xl capitalize">Coming Soon!</CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center">
          <CardDescription>We're working on something great. This page will be available soon.</CardDescription>
        </CardContent>
        <CardFooter>
          <Link href="/" className={clsx(buttonVariants(), 'm-auto')}>
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
