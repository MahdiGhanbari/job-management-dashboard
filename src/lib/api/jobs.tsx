import { IListResponse } from '@/types/common';
import { IJob, IJobFilter } from '@/types/job';
import { cacheLife, cacheTag } from 'next/cache';
import { cache } from 'react';
import { interval } from '../utils';

const API_URL = process.env.API_URL;
type StaticType = 'jobTypes' | 'departments' | 'locations' | 'statuses';

export async function getJobs(params?: IJobFilter): Promise<IListResponse<IJob> | null> {
  const queryString = new URLSearchParams();
  if (params) {
    queryString.set('_per_page', String(params?.limit || 5));
    queryString.set('_page', String(params?.page || 1));
    Object.keys(params).forEach((field) => {
      if (!['page', 'limit'].includes(field)) {
        queryString.set(`${field}:contains`, String(params[field as keyof IJobFilter]));
      }
    });
  }

  const res = await fetch(`${API_URL}/jobs?${queryString.toString()}`);
  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return res.json();
}

export async function addJob(data: IJob): Promise<IJob> {
  const res = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create new job');
  }
  return res.json();
}

export async function updateJob(id: string, data: Partial<IJob>): Promise<IJob> {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to update the job');
  }
  return res.json();
}

export async function deleteJob(id: String): Promise<boolean> {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete the job');
  }
  return true;
}

export async function getStaticData(type: StaticType): Promise<Record<string, string>[]> {
  'use cache';
  cacheTag(type);
  cacheLife('staticData');

  const res = await fetch(`${API_URL}/${type}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }
  return res.json();
}

export const getJob = cache(async (id: String): Promise<IJob | null> => {
  const res = await fetch(`${API_URL}/jobs/${id}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch job');
  }
  return res.json();
});
