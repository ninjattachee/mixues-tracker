'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

type IssueFormData = z.infer<typeof issueSchema>;

interface IssueFormProps {
    issue?: Issue;
}


const IssueForm = ({ issue }: IssueFormProps) => {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            title: issue?.title,
            description: issue?.description ?? '',
        },
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: IssueFormData) => {
        try {
            setIsSubmitting(true);
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data);
            } else {
                await axios.post('/api/issues', data);
            }
            router.push('/issues');
            router.refresh();
        } catch (error) {
            setError('Failed to create issue');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller control={control} name='description' render={({ field }) => <SimpleMDE placeholder='Description' {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button type='submit' disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
                </Button>
            </form>

        </div>
    );
}

export default IssueForm; 