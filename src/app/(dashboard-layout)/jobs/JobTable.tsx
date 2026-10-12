'use client';

import { IJob } from '@/types/job';
import Menu, { IMenuItem } from '@/components/common/Menu';
import TableData, { ITableColumn, TableSkeleton } from '@/components/common/TableData';
import { ReactNode, Suspense, useState } from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';
import { IListResponse } from '@/types/common';
import { Card, CardContent } from '@/components/ui/card';
import { ConfrimDialog } from '@/components/common/ConfirmDialog';
import { removeJob } from '@/app/actions/job';
import { toast } from 'sonner';
import JobStatusBadge from './components/JobStatusBadge';

export default function JobTable({ data }: { data: Promise<IListResponse<IJob> | null> }) {
  const [deleteId, setDeleteId] = useState<String | undefined>();

  function getActions(item: IJob): ReactNode {
    const items: (IMenuItem | null)[] = [
      {
        customItem: (
          <Link className="w-full" href={`/jobs/${item.id}/edit`}>
            Edit
          </Link>
        ),
      },
      {
        customItem: (
          <Link className="w-full" href={'/jobs/' + item.id}>
            Details
          </Link>
        ),
      },
      null,
      { action: () => setDeleteId(item.id), title: 'Delete', variant: 'destructive' },
    ];
    return (
      <Menu items={items}>
        <MoreHorizontalIcon />
      </Menu>
    );
  }

  async function onDeleteItem() {
    if (deleteId) {
      const res = await removeJob(deleteId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
    setDeleteId('');
  }

  const columns: ITableColumn<IJob>[] = [
    { title: 'Title', field: 'title' },
    { title: 'Departme', field: 'department' },
    { title: 'Location', field: 'location' },
    { title: 'Job Type', field: 'jobType' },
    { title: 'Status', handler: (item) => <JobStatusBadge status={item.status} /> },
    { title: 'Actions', handler: getActions },
  ];

  const perPageItems: Record<string, any>[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '100', value: 100 },
  ];

  return (
    <Card className="mt-4">
      <ConfrimDialog
        open={!!deleteId}
        title="Delete Job"
        description="Are you sure delete the job?"
        variant="Warnning"
        onCancel={() => setDeleteId('')}
        onAccept={() => onDeleteItem()}
      />
      <CardContent>
        <Suspense fallback={<TableSkeleton<IJob> columns={columns} rows={10} />}>
          <TableData {...{ data, perPageItems }} columns={columns} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
