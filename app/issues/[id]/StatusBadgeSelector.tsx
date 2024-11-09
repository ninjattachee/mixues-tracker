"use client";

import { Select } from "@radix-ui/themes";
import { IssueStatusBadge, statusMap } from "@/app/components";
import { Status } from "@prisma/client";
import axios from "axios";
import { toast } from "react-hot-toast";

const StatusBadgeSelector = ({
  status,
  issueId,
  onlooker,
}: {
  status: Status;
  issueId: number;
  onlooker: boolean;
}) => {
  const handleStatusChange = (status: string) => {
    axios.patch(`/api/issues/${issueId}`, { status }).catch((error) => {
      toast.error("Failed to update status");
    });
  };

  return (
    <Select.Root defaultValue={status} onValueChange={handleStatusChange} disabled={onlooker}>
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
