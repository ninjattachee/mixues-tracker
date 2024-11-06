import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignee: true,
    },
  });

  return (
    <Card>
        <Heading size="4" mb="2">
          Latest Issues
        </Heading>
        <Table.Root variant="surface">
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between">
                      <Flex direction="column" gap="2" align="start">
                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                        <IssueStatusBadge status={issue.status} />
                      </Flex>
                      {issue.assignee && (
                        <Avatar
                          src={issue.assignee?.image ?? undefined}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
    </Card>
  );
};

export default LatestIssues;
