import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) => {
  const { status, orderBy, page, order, pageSize } = await searchParams;

  const statuses = Object.values(Status);
  const statusToFilterBy = statuses.includes(status) ? status : undefined;
  const where = { status: statusToFilterBy, archived: false };

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
