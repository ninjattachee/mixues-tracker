"use client";

import { Button, Flex, TextArea } from "@radix-ui/themes";
import { Spinner } from "@/app/components";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CommentForm = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(`/api/issues/${issueId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });

      setContent("");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <TextArea
        className="my-4"
        placeholder="Reply to this issue..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Flex justify="end">
        <Button disabled={isSubmitting}>
          Submit {isSubmitting && <Spinner />}
        </Button>
      </Flex>
    </form>
  );
};

export default CommentForm;
