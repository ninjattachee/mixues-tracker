import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createIssueSchema } from '@/app/validationSchemas'

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