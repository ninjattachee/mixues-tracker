import { redirect } from "next/navigation";

export default async function DeleteIssue({ issueId }: { issueId: number }) {
    await fetch(`/api/issues/${issueId}`, { method: 'DELETE' });
    redirect('/issues');
}