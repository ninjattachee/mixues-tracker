import { auth } from "@/app/auth";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  return NextResponse.json(issue);
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: issueId } = await props.params;
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assigneeId, title, description, status, archived } = body;

  if (assigneeId) {
    const user = await prisma.user.findUnique({
      where: { id: assigneeId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid assignee" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  // if the user is not the creator or the assignee, they cannot edit the issue
  if (issue.creatorId !== session.user?.id && issue.assigneeId !== session.user?.id)
    return NextResponse.json({ error: "Not authorized to edit this issue" }, { status: 403 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assigneeId, status, archived },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || !session.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await props.params;

  const issue = await prisma.issue.findUnique({ 
    where: { id: parseInt(id) },
    select: { creatorId: true }
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue id" }, { status: 400 });

  if (issue.creatorId !== session.user.id)
    return NextResponse.json({ error: "Not authorized to delete this issue" }, { status: 403 });

  await prisma.issue.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: "Issue deleted" }, { status: 200 });
}
