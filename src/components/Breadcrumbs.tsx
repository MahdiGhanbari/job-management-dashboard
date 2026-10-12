'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Fragment } from 'react';

interface Props {
  labels?: Record<string, string>;
  className?: string;
}

export default function Breadcrumbs({ labels = {}, className }: Props) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length == 1) {
    return;
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const label = labels[href] ?? segment;

          return (
            <Fragment key={href}>
              {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
              <BreadcrumbItem className="capitalize">
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="text-indigo-400" href={href}>
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
