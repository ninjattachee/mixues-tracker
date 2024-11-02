import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required').max(1000),
})

export async function GET(request: NextRequest) {
    const issues = await prisma.issue.findMany()
    return NextResponse.json(issues)
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title, description } = createIssueSchema.parse(body)
        const issue = await prisma.issue.create({ data: { title, description } })
        return NextResponse.json(issue, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}