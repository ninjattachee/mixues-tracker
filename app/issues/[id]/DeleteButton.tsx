'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  async function deleteIssue({ issueId }: { issueId: number }) {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setError(true);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'>Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
          <Flex mt='4' gap='3' justify='end'>
            <AlertDialog.Cancel>
              <Button variant='soft'>Cancel</Button>
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
