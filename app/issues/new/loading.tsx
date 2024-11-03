import ErrorMessage from '@/app/components/ErrorMessage'
import { Box, Button, Flex, Skeleton, Spinner, TextField } from '@radix-ui/themes'
import { register } from 'module'
import React from 'react'
import { Controller } from 'react-hook-form'

const NewIssueLoading = () => {
    return (
        <Flex className='max-w-xl' direction='column' gap='3'>
            <Skeleton height='1.8rem' />
            <Skeleton height='22rem' />
        </Flex>
    )
}

export default NewIssueLoading
