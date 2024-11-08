"use client";

import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const RestoreButton = ({ issue }: { issue: Issue }) => {
  const route = useRouter();
  const [isRestoring, setIsRestoring] = useState(false);

  const restoreIssue = async () => {
    try {
      setIsRestoring(true);
      await axios.patch(`/api/issues/${issue.id}`, {
        archived: false,
      });
      route.refresh();
      toast.success("Issue restored.");
    } catch (error) {
      toast.error("Failed to restore issue.");
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <Button
      size="1"
      variant="soft"
      color="green"
      highContrast
      onClick={restoreIssue}
      disabled={isRestoring}
    >
      {isRestoring ? "Restoring..." : "Restore"}
    </Button>
  );
};

export default RestoreButton;
