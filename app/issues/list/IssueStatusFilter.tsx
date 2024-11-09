"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const refreshParams = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status !== "ALL") {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    if (searchParams.get("orderBy")) {
      params.set("orderBy", searchParams.get("orderBy")!);
    }
    router.push(`/issues/list?${params.toString()}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") ?? ""}
      onValueChange={refreshParams}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value ?? "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
