'use client';

import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { status } = useSession();

  async function deleteIssue({ issueId }: { issueId: number }) {

      setIsDeleting(true);
      try {
        await axios.delete(`/api/issues/${issueId}`);
        router.push('/issues/list');
        router.refresh();
      } catch (error) {
        setError(true);
      } finally {
        setIsDeleting(false);
      }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
          <Flex mt='4' gap='3' justify='end'>
            <AlertDialog.Cancel>
              <Button color='gray' variant='soft'>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={() => deleteIssue({ issueId })}>Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>Failed to delete issue.</AlertDialog.Description>
          <Flex mt='4' gap='3' justify='end'>
            <Button color='gray' variant='soft' onClick={() => setError(false)}>Close</Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteButton
