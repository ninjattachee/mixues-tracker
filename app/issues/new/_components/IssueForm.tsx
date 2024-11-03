'use client';

import { Button, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface IssueForm {
    title: string;
    description: string;
}

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);

const IssueForm = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>();

  const onSubmit = (data: IssueForm) => {
    axios.post('/api/issues', data).then(() => {
      router.push('/issues');
    }).catch(() => {
      toast.error('Failed to create issue.');
    });
  }

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder='Title' {...register('title', { required: true })} />
      <Controller control={control} name='description' render={({ field }) => <SimpleMDE placeholder='Description' {...field} />} />
      <Button>Submit New Issue</Button>
    </form>
  );
}

export default IssueForm; 