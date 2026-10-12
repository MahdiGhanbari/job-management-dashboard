'use client';

import { ReactNode } from 'react';

export default function JobBannerItem({ title, desc, icon }: { title: string; desc: string; icon: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="bg-indigo-100 p-2 rounded-xl text-3xl">{icon}</span>
      <div>
        <h2 className="font-bold text-lg">{title}</h2>
        <h3 className="text-gray-500">{desc}</h3>
      </div>
    </div>
  );
}
