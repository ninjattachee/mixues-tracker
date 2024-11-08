"use client";

import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Issue, User } from "@prisma/client";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
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
            issue.assigneeId &&
              axios
                .patch(`/api/issues/${issue.id}`, { status: "IN_PROGRESS" })
                .catch(() => {
                  toast.error("Failed to update issue status.");
                });
          })
          .catch(() => {
            toast.error("Failed to get issue.");
          });
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assigneeId ? issue.assigneeId.toString() : ""}
        onValueChange={assignIssue}
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

export default AsigneeSelect;
