'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import DeleteIssue from '../_components/DeleteIssue';

const DeleteButton = ({ issueId }: { issueId: number }) => {

  return (
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
            <Button color='red' onClick={() => DeleteIssue({ issueId })}>Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteButton
