"use client";

import { Skeleton } from "@/app/components";
import { Issue, Session, User } from "@prisma/client";
import { Select, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AsigneeSelect = ({ issue, session }: { issue: Issue; session: Session }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assigneeId: userId === "unassigned" ? null : userId,
      })
      .catch(() => {
        toast.error("Failed to reassign issue.");
      })
      .finally(() => {
        axios
          .get(`/api/issues/${issue.id}`)
          .then((res) => {
            const issue: Issue = res.data;
            issue.assigneeId
              ? toast.success("Issue assigned to user.")
              : toast.success("Issue unassigned.");
            handleStatusUpdate(issue);
          })
          .catch(() => {
            toast.error("Failed to get issue.");
          });
      });
  };

  const onlooker =
    session.userId !== issue.creatorId &&
    session.userId !== issue.assigneeId;

  return (
    <>
      {onlooker && (
        <Text size="4">Assignee:</Text>
      )}
      <Select.Root
        disabled={onlooker}
        defaultValue={issue.assigneeId ? issue.assigneeId.toString() : ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Select Assignee" />
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

const updateStatusToInProgress = (issueId: number) => {
  axios.patch(`/api/issues/${issueId}`, { status: "IN_PROGRESS" }).catch(() => {
    toast.error("Failed to update issue status.");
  });
};

const updateStatusToOpen = (issueId: number) => {
  axios.patch(`/api/issues/${issueId}`, { status: "OPEN" }).catch(() => {
    toast.error("Failed to update issue status.");
  });
};

const handleStatusUpdate = (issue: Issue) => {
  if (issue.assigneeId && issue.status === "OPEN") {
    updateStatusToInProgress(issue.id);
  } else if (!issue.assigneeId && issue.status === "IN_PROGRESS") {
    updateStatusToOpen(issue.id);
  }
};

export default AsigneeSelect;
