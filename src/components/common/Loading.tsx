import { ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface LoadingProps {
  message?: string
  fullScreen?: boolean
};

export default function Loading({ message = 'Loading...', fullScreen = false }: LoadingProps):ReactNode {
  return (
    <div role="status" className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? 'h-full' : 'min-h-[300px]'}`}>
      <FaSpinner className="animate-spin text-4xl text-indigo-600" aria-hidden="true" />

      <p className="text-sm font-medium text-slate-600">{message}</p>

      <span className="sr-only">Please wait</span>
    </div>
  );
}
