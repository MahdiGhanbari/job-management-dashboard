import { MdOutlineErrorOutline } from 'react-icons/md';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { RiResetRightLine } from 'react-icons/ri';
import { IErrorPageProps } from '@/types/common';
import { ReactNode } from 'react';
import { Button } from '../ui/button';

export default function ErrorPage({ error, retry, title, text = "We couldn't load this page. Please try again." }: IErrorPageProps): ReactNode {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center">
        <div className="mb-3 flex size-16 items-center justify-center rounded-2xl bg-red-50">
          <MdOutlineErrorOutline className="size-9 text-red-600" />
        </div>

        <CardTitle className="text-2xl text-indigo-400">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 justify-center">
        <h1 className="text-xl">Something went wrong</h1>
        <CardDescription>{text}</CardDescription>
        {process.env.NODE_ENV === 'development' && (
          <p className=" w-full break-words rounded-md bg-slate-50 p-3 text-left text-xs text-slate-500">{error.message}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={retry} className="m-auto">
          <RiResetRightLine size={20} />
          Try again
        </Button>
      </CardFooter>
    </Card>
  );
}
