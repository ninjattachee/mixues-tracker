import prisma from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) notFound()

    return (
        <Grid columns='1' gap='5'>
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex justify='end' className="max-w-xl">
                    <EditIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage
