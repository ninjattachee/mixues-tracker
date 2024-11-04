import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import ClientIssueForm from '../../_components/ClientIssueForm';

const EditIssuePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

    if (!issue) notFound();

    return <ClientIssueForm issue={issue} />
}

export default EditIssuePage
