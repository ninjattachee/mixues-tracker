'use client';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';
import IssueFormSkeleton from './IssueFormSkeleton';

const IssueForm = dynamic(
    () => import('./IssueForm'),
    { ssr: false, loading: () => <IssueFormSkeleton /> }
);

export default function ClientIssueForm({ issue }: { issue?: Issue }) {
    return <IssueForm issue={issue} />
}
