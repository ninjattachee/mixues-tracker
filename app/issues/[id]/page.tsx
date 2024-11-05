import prisma from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import DeleteButton from "./DeleteButton"
import { auth } from "@/app/auth"
import AsigneeSelect from "./AsigneeSelect"

const IssueDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })

    if (!issue) { notFound() }

    const session = await auth();

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                {
                    session && (
                        <Flex direction='column' justify='center' gap='4' className="max-w-full">
                            <AsigneeSelect />
                            <EditIssueButton issueId={issue.id} />
                            <DeleteButton issueId={issue.id} />
                        </Flex>
                    )
                }
            </Box>
        </Grid>
    )
}

export default IssueDetailPage
