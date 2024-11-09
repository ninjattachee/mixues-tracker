

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const assignees = await prisma.issue.findMany({
    where: { assigneeId: { not: null } },
    select: { assigneeId: true, assignee: { select: { name: true } } },
  });

  // Filter out duplicate assignees
  const uniqueAssignees = assignees.filter(
    (assignee, index, self) =>
      index === self.findIndex((a) => a.assigneeId === assignee.assigneeId)
  );

  return NextResponse.json(uniqueAssignees);
}
