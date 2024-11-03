import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import ReactMarkdown from "react-markdown"
import prisma from "@/prisma/client"
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import Link from "next/link"
import { notFound } from "next/navigation"

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) notFound()

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text size='2'>Created: {issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose max-w-full" mt='4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
            <Flex className="mt-5 justify-self-end">
                <Button>
                    <Link href='.'>Back</Link>
                </Button>
            </Flex>
        </div>
    )
}

export default IssueDetailPage
