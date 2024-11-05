import { redirect } from 'next/navigation';
import ClientIssueForm from '../_components/ClientIssueForm';
import { auth } from '@/app/auth';

const NewIssuePage = async () => {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');
    return <ClientIssueForm />
}

export default NewIssuePage
