"use client";

import { Button, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const DeleteCommentButton = ({ commentId }: { commentId: number }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteComment = async (commentId: number) => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${commentId}/comments`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      color="red"
      variant="ghost"
      size="2"
      onClick={() => deleteComment(commentId)}
      disabled={isDeleting}
    >
      {isDeleting ? <Spinner /> : "Delete"}
    </Button>
  );
};

export default DeleteCommentButton;
