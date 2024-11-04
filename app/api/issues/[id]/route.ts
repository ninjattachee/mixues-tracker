
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const { title, description } = validation.data;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: { title, description }
    });

    return NextResponse.json(updatedIssue, { status: 200 });
}
