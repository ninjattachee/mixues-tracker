import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import { auth } from "@/app/auth";

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

  const params = await props.params;
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description } = validation.data;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await props.params;

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue id" }, { status: 400 });

  await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({ message: "Issue deleted" }, { status: 200 });
}
