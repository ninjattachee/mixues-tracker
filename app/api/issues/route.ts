import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { issueSchema } from "@/app/validationSchemas";
import { auth } from "@/app/auth";

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { title, description } = issueSchema.parse(body);
    const issue = await prisma.issue.create({ data: { title, description } });
    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
