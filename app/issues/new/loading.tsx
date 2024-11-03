import { Flex } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const NewIssueLoading = () => {
    return (
        <Flex className='max-w-xl' direction='column' gap='3'>
            <Skeleton height='1.8rem' />
            <Skeleton height='22rem' />
        </Flex>
    )
}

export default NewIssueLoading
