import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter';
import IssueAssigneeFilter from './IssueAssigneeFilter';

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <Flex gap="2">
        <IssueStatusFilter />
        <IssueAssigneeFilter />
      </Flex>
      <Button>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions
