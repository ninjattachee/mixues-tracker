"use client";

import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ArchiveButton = ({ issue }: { issue: Issue }) => {
  const route = useRouter();
  const [isArchiving, setIsArchiving] = useState(false);

  const archiveIssue = async () => {
    try {
      setIsArchiving(true);
      await axios.patch(`/api/issues/${issue.id}`, {
        archived: true,
      });
      route.refresh();
      toast.success("Issue archived.");
    } catch (error) {
      toast.error("Failed to archive issue.");
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <Button
      size="1"
      variant="soft"
      color="iris"
      highContrast
      onClick={archiveIssue}
      disabled={isArchiving}
    >
      {isArchiving ? "Archiving..." : "Archive"}
    </Button>
  );
};

export default ArchiveButton;
