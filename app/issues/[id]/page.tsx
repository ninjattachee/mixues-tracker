import { auth } from "@/app/auth";
import prisma from "@/prisma/client";
import { Session } from "@prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import AsigneeSelect from "./AsigneeSelect";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import DeleteButton from "./DeleteButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

const IssueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));

  if (!issue) {
    notFound();
  }

  
  const session = (await auth()) as Session | null;
  const onlooker =
    session?.userId !== issue.creatorId &&
    session?.userId !== issue.assigneeId;
  
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} onlooker={onlooker} />
        <Box className="mt-5">
          <Text size="5" mb="4">
            Comments
          </Text>
          {session && <CommentForm issueId={issue.id} />}
          <Box className="mt-5">
            <CommentList comments={issue.comments} session={session} />
          </Box>
        </Box>
      </Box>
      <Box>
        {session && (
          <Flex
            direction="column"
            justify="center"
            gap="4"
            className="max-w-full"
          >
            <AsigneeSelect issue={issue} session={session} />
            {!onlooker && <EditIssueButton issueId={issue.id} />}
            {session.userId === issue.creatorId && (
              <DeleteButton issueId={issue.id} />
            )}
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
    include: {
      comments: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));

  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailPage;
