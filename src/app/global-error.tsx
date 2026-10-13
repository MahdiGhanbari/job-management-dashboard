'use client';

import ErrorPage from '@/components/common/ErrorPage';
import { IErrorPageProps } from '@/types/common';

export default function GlobalError({ error, retry }: IErrorPageProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <main className="flex min-h-screen items-center justify-center p-6">
          <ErrorPage
            {...{ error, retry }}
            title="Talent Flow"
            text="An unexpected error occurred. Please try again.
              If the problem persists, reload the page later."
          />
        </main>
      </body>
    </html>
  )
}
