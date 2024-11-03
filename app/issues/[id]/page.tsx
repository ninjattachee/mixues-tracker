import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import prisma from "@/prisma/client"
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Pencil2Icon } from "@radix-ui/react-icons"

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) notFound()

    return (
        <Grid columns='1' gap='5'>
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex gap='3' my='2'>
                    <IssueStatusBadge status={issue.status} />
                    <Text size='2'>Created: {issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className="prose max-w-xl" mt='4'>
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Flex justify='end' className="max-w-xl">
                    <Button>
                        <Pencil2Icon />
                        <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                    </Button>
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage
