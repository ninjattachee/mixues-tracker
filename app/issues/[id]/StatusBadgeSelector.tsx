'use client'

import { Select } from "@radix-ui/themes";
import { IssueStatusBadge, statusMap } from "@/app/components";
import { Status } from "@prisma/client";
import axios from "axios";

const StatusBadgeSelector = ({ status, issueId }: { status: Status, issueId: number }) => {

  return (
    <Select.Root
      defaultValue={status}
      onValueChange={(status) => {
        axios.patch(`/api/issues/${issueId}`, { status });
      }}
    >
      <Select.Trigger variant="ghost" />
      <Select.Content>
        {Object.keys(statusMap).map((status) => (
          <Select.Item key={status} value={status}>
            <IssueStatusBadge status={status as Status} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default StatusBadgeSelector;
