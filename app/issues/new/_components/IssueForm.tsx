'use client';

import { Button, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);

const IssueForm = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Title' />
      <SimpleMDE placeholder='Description' />
      <Button>Submit New Issue</Button>
    </div>
  );
}

export default IssueForm; 