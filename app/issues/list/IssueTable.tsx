import { IssueStatusBadge, Link } from "@/app/components";
import ArchiveButton from "@/app/components/ArchiveButton";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order?: "asc" | "desc";
  page?: string;
  pageSize?: string;
}

interface IssueTableProps {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: IssueTableProps) => {
  const { status, orderBy, order } = searchParams;

  const newOrder = toggleOrder(order);

  return (
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
                  query: { status, orderBy: column.value, order: newOrder },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === orderBy &&
                (order === "asc" ? (
                  <ArrowUpIcon className="inline ml-1" />
                ) : order === "desc" ? (
                  <ArrowDownIcon className="inline ml-1" />
                ) : null)}
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
              <Flex gap="2" align="center" justify="between">
                <IssueStatusBadge status={issue.status} />
                <ArchiveButton issue={issue} />
              </Flex>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: "hidden md:table-cell";
}[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const toggleOrder = (currentOrder: "asc" | "desc" | undefined) => {
  return currentOrder === undefined
    ? "asc"
    : currentOrder === "asc"
    ? "desc"
    : "asc";
};

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
