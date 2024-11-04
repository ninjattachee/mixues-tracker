import prisma from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import DeleteButton from "./DeleteButton"

const IssueDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })

    if (!issue) { notFound() }

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction='column' justify='center' gap='4' className="max-w-full">
                    <EditIssueButton issueId={issue.id} />
                    <DeleteButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage
