import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Heading } from "@radix-ui/themes";
import IssueTable, { IssueQuery } from "../list/IssueTable";
import { archivedColumnNames, archivedColumns } from "../../components/columns";

const ArchivedIssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) => {
  const { status, orderBy, page, order, pageSize } = await searchParams;

  const statuses = Object.values(Status);
  const statusToFilterBy = statuses.includes(status) ? status : undefined;
  const where = { status: statusToFilterBy, archived: true };

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
    orderBy: archivedColumnNames.includes(orderBy) ? { [orderBy]: order } : undefined,
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div>
      <Heading size="4" mb="3">Archived Issues</Heading>
      <IssueTable
        columns={archivedColumns}
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

export default ArchivedIssuesPage
