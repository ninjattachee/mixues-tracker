import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page?: string;
}

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) => {
  const { status, orderBy, page } = await searchParams;
  const statuses = Object.values(Status);
  const statusToFilterBy = statuses.includes(status) ? status : undefined;
  const pageSize = 10;
  const columns: {
    label: string;
    value: keyof Issue;
    className?: "hidden md:table-cell";
  }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const itemCount = await prisma.issue.count({
    where: {
      status: statusToFilterBy,
    },
  });
  
  const pageCount = Math.ceil(itemCount / pageSize);
  
  let currentPage = parseInt(page || "1");
  if (currentPage > pageCount) currentPage = pageCount;
  if (currentPage < 1) currentPage = 1;
  
  const issues = await prisma.issue.findMany({
    where: {
      status: statusToFilterBy,
    },
    orderBy: columns.map(column => column.value).includes(orderBy) ? { [orderBy]: "asc" } : undefined,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { status, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderBy && (
                  <ArrowUpIcon className="inline ml-1" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
