import { Pencil2Icon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import Link from "next/link"

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button>
            <Pencil2Icon />
            <Link className="align-bottom" href={`/issues/edit/${issueId}`}>Edit Issue</Link>
        </Button>

    )
}

export default EditIssueButton
