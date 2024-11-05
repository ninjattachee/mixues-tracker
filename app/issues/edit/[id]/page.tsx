import prisma from '@/prisma/client';
import { notFound, redirect } from 'next/navigation';
import ClientIssueForm from '../../_components/ClientIssueForm';
import { auth } from '@/app/auth';

const EditIssuePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const { id } = await params;
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

    if (!issue) notFound();

    return <ClientIssueForm issue={issue} />
}

export default EditIssuePage
