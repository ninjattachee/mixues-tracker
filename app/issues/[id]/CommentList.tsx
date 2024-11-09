import { Comment } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import DeleteCommentButton from "./DeleteCommentButton";

interface CommentWithUser extends Comment {
  user: { name: string | null; image: string | null };
}

const CommentList = ({ comments }: { comments: CommentWithUser[] }) => {
  return (
    <Flex direction="column" gap="3">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <Flex gap="3" mb="1" align="center">
            {comment.user.image && (
              <img
                src={comment.user.image}
                alt={comment.user.name || "User"}
                className="rounded-full w-8 h-8"
              />
            )}
            <Flex gap="1">
              <Text size="2" weight="bold">
                {comment.user.name}
              </Text>
              <Text size="2" color="gray">
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </Flex>
          </Flex>
          <Text>{comment.content}</Text>
          <Flex justify="end">
            <DeleteCommentButton commentId={comment.id} />
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default CommentList;
