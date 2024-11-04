import IssueForm from '@/app/issues/_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';

const EditIssuePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    });

    if (!issue) notFound();

    return <IssueForm issue={issue} />
}

export default EditIssuePage
