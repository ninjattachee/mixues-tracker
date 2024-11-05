"use client";

import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assigneeId ? issue.assigneeId.toString() : ""}
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assigneeId: userId === "unassigned" ? null : userId,
        });
      }}
    >
      <Select.Trigger placeholder="Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
