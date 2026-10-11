'use client';

import { JobFormValues } from '@/app/schemas/job.schema';
import { TextareaField } from '@/components/common/TextareaField';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { useFormContext } from 'react-hook-form';
import { LuClipboardList } from 'react-icons/lu';

export default function ReqRes() {
  const {
    register,
    formState: { errors },
  } = useFormContext<JobFormValues>();

  return (
      <Card className="w-full select-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LuClipboardList size="24" />
            <span>Requirements & Responsibilities</span>
          </CardTitle>
          <CardDescription>Tell us what the candidate need and what they'll be doing.</CardDescription>

          <CardContent>
            <Field>
              <Field orientation="horizontal">
                <TextareaField
                  {...register('requirements')}
                  error={errors.requirements}
                  label="Requirements"
                  placeholder="Add requirment(one per line)"
                />
              </Field>
              <Field orientation="horizontal">
                <TextareaField
                  {...register('responsibilities')}
                  error={errors.responsibilities}
                  label="Responsibilities"
                  placeholder="Add responsibility(one per line)"
                />
              </Field>
            </Field>
          </CardContent>
        </CardHeader>
      </Card>
  );
}
