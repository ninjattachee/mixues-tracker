import prisma from "@/prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import { auth } from "@/app/auth";
import AsigneeSelect from "./AsigneeSelect";
import { cache } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { Session } from "@prisma/client";

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

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
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
            <AsigneeSelect issue={issue} />
            {(session.userId === issue.creatorId ||
              session.userId === issue.assigneeId) && (
              <EditIssueButton issueId={issue.id} />
            )}
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
