import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import StatusBadgeSelector from './StatusBadgeSelector'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <StatusBadgeSelector status={issue.status} issueId={issue.id} />
                <Text size="2">Created: {issue.createdAt.toDateString()}</Text>
            </Flex>
                <Card className="prose max-w-full" mt='4'>
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    )
}

export default IssueDetails
