import { Flex, Card, Button, Box } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { Skeleton } from '@/app/components'

const LoadingIssueDetailPage = async () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton width='13.8rem' height='1.5rem'/>
            <Flex gap='3' my='2'>
                <Skeleton width='3rem' />
                <Skeleton width='10rem' />
            </Flex>
            <Card className="prose" mt='4'>
                <Skeleton count={3} />
            </Card>
            <Flex className="mt-5 justify-self-end">
                <Button>
                    <Link href='.'>Back</Link>
                </Button>
            </Flex>

        </Box>
    )
}

export default LoadingIssueDetailPage
