"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Assignee {
  assigneeId: string;
  assignee: { name: string };
}

const IssueAssigneeFilter = () => {
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/assignees")
      .then((response) => response.json())
      .then(setAssignees);
  }, []);

  const refreshSearchParams = (assigneeId?: string) => {
    const params = new URLSearchParams(searchParams);
    if (assigneeId && assigneeId !== "all_assignees") {
      params.set("assigneeId", assigneeId);
    } else {
      params.delete("assigneeId");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select.Root onValueChange={refreshSearchParams}>
      <Select.Trigger placeholder="Filter by assignee..." />
      <Select.Content>
        <Select.Item value="all_assignees">All assignees</Select.Item>
        {assignees.map((assignee: Assignee) => (
          <Select.Item key={assignee.assigneeId} value={assignee.assigneeId!}>
            {assignee.assignee?.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssigneeFilter;
