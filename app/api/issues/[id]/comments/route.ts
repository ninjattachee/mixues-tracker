import { auth } from "@/app/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.content)
    return NextResponse.json({ error: "Content is required" }, { status: 400 });

  const comment = await prisma.comment.create({
    data: {
      content: body.content,
      issueId: parseInt(params.id),
      userId: session.user.id,
    },
  });

  return NextResponse.json(comment, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const comment = await prisma.comment.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!comment)
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });

  if (comment.userId !== session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    await prisma.comment.delete({
      where: { id: parseInt(params.id) },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
