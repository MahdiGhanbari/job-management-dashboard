import { MdOutlineErrorOutline } from 'react-icons/md';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { RiResetRightLine } from 'react-icons/ri';
import { IErrorPageProps } from '@/types/common';
import { ReactNode } from 'react';
import { Button } from '../ui/button';

export default function ErrorPage({ error, retry, title, text= "We couldn't load this page. Please try again." }: IErrorPageProps): ReactNode {
  return (
    <Card>
      <CardHeader className="flex items-center justify-center ">
        <CardTitle className='text-center'>
            <div className="text-red-500 rounded-full bg-red-50 p-2 inline-block">
                <MdOutlineErrorOutline size={46} />
            </div>
            
            {title && <h1 className='mt-2 font-bold text-indigo-600'>{title}</h1>}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <h1 className="text-xl font-semibold text-slate-900">Something went wrong</h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>

        {process.env.NODE_ENV === 'development' && (
          <p className="mt-4 w-full break-words rounded-md bg-slate-50 p-3 text-left text-xs text-slate-500">{error.message}</p>
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
