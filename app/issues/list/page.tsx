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
  const { status, orderBy, page } = await searchParams;

  const statuses = Object.values(Status);
  const statusToFilterBy = statuses.includes(status) ? status : undefined;
  const where = { status: statusToFilterBy };

  const pageSize = 10;
  const itemCount = await prisma.issue.count({
    where,
  });

  const pageCount = Math.ceil(itemCount / pageSize);
  let currentPage = parseInt(page || "1");
  if (currentPage > pageCount) currentPage = pageCount;
  if (currentPage < 1) currentPage = 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: columnNames.includes(orderBy) ? { [orderBy]: "asc" } : undefined,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <IssueActions />
      <IssueTable searchParams={{ status, orderBy }} issues={issues} />
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
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
