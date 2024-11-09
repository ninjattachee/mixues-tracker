import prisma from "@/prisma/client";
import { Select } from "@radix-ui/themes";
import { cache } from "react";

const IssueAssigneeFilter = async () => {
  const assignees = await fetchAssignees();

  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by assignee..." />
      <Select.Content>
        <Select.Item value="all_assignees">All assignees</Select.Item>
        {assignees.map((assignee) => (
          <Select.Item value={assignee.assigneeId!}>
            {assignee.assignee?.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const fetchAssignees = cache(async () => {
  const assignees = await prisma.issue.findMany({
    where: {
      assigneeId: {
        not: null,
      },
    },
    select: {
      assigneeId: true,
      assignee: {
        select: {
          name: true,
        },
      },
    },
  });

  // Filter out duplicate assignees
  const uniqueAssignees = assignees.filter(
    (assignee, index, self) =>
      index === self.findIndex((a) => a.assigneeId === assignee.assigneeId)
  );

  return uniqueAssignees;
});

export default IssueAssigneeFilter;
