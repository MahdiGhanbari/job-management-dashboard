'use client';

import { IErrorPageProps } from '@/types/common';
import ErrorPage from '@/components/common/ErrorPage';



export default function Error(props: IErrorPageProps) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center p-6">
      <ErrorPage {...props}/>
    </div>
  )
}
