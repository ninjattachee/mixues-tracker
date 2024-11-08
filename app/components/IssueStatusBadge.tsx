import { Status } from '@prisma/client';
import { Badge, BadgeProps } from '@radix-ui/themes';

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export const statusMap: Record<Status, { label: string, color: BadgeProps['color'] }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
}

export default IssueStatusBadge
