import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Session, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery } from "./IssueTable";
import { columnNames, columns } from "../../components/columns";
import { auth } from "@/app/auth";
import { Metadata } from "next";

interface IssueSearchParams extends IssueQuery {
  assigneeId?: string;
}

interface Filter {
  status?: Status;
  archived?: boolean;
  assigneeId?: string | null;
}

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<IssueSearchParams>;
}) => {
  const { status, orderBy, page, order, pageSize, assigneeId } = await searchParams;
  const session = (await auth()) as Session | null;
  const statuses = Object.values(Status);
  const statusToFilterBy = statuses.includes(status) ? status : undefined;
  const where: Filter = { status: statusToFilterBy, archived: false };

  if (assigneeId) {
    where.assigneeId = assigneeId;
  }

  const itemsPerPage = parseInt(pageSize || "10");
  const itemCount = await prisma.issue.count({
    where,
  });

  const pageCount = Math.ceil(itemCount / itemsPerPage);
  let currentPage = parseInt(page || "1");
  if (currentPage > pageCount) currentPage = pageCount;
  if (currentPage < 1) currentPage = 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: columnNames.includes(orderBy) ? { [orderBy]: order } : undefined,
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div>
      <IssueActions />
      <IssueTable
        session={session}
        columns={columns}
        searchParams={{
          status,
          orderBy,
          order,
          pageSize: itemsPerPage.toString(),
        }}
        issues={issues}
      />
      <Pagination
        itemCount={itemCount}
        pageSize={itemsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Mixues - Issues",
  description: "List of issues for Mixin Network and Mixin Messenger",
};
