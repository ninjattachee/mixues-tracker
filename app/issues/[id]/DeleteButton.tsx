
import { Button } from '@radix-ui/themes';

const DeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='red'>Delete Issue</Button>
  )
}

export default DeleteButton
