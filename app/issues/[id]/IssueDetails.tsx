import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import StatusBadgeSelector from './StatusBadgeSelector';

interface IssueDetailsProps {
    issue: Issue & { creator?: { name: string | null; image: string | null } };
    onlooker: boolean;
}

const IssueDetails = ({ issue, onlooker }: IssueDetailsProps) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <Flex gap='2' align='center'>
                    {issue.creator?.image && (
                        <img 
                            src={issue.creator.image} 
                            alt={issue.creator.name || 'Creator'} 
                            className="rounded-full w-6 h-6"
                        />
                    )}
                    <Text size="2" color="gray">
                        {issue.creator?.name || 'Unknown user'} opened on {issue.createdAt.toDateString()}
                    </Text>
                </Flex>
                <StatusBadgeSelector status={issue.status} issueId={issue.id} onlooker={onlooker} />
            </Flex>
            <Card className="prose max-w-full" mt='4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    )
}

export default IssueDetails
