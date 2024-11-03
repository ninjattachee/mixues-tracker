'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

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
    const [error, setError] = useState('');

    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setError('Failed to create issue');
        }
    }

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root placeholder='Title' {...register('title')} />
                <Controller control={control} name='description' render={({ field }) => <SimpleMDE placeholder='Description' {...field} />} />
                <Button>Submit New Issue</Button>
            </form>

        </div>
    );
}

export default IssueForm; 