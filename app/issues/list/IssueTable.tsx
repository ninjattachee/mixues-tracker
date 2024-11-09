import { IssueStatusBadge, Link } from "@/app/components";
import ArchiveButton from "@/app/components/ArchiveButton";
import { Issue, Session, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { Column } from "../../components/columns";
import RestoreButton from "@/app/components/RestoreButton";

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
  columns: Column[];
  session: Session | null;
}

const IssueTable = async ({
  searchParams,
  issues,
  columns,
  session,
}: IssueTableProps) => {
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
        {issues.map((issue) => {
          const onlooker =
            session?.userId !== issue.creatorId &&
            session?.userId !== issue.assigneeId;
          return (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex gap="4" justify="start">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  {issue.archived && !onlooker && <RestoreButton issue={issue} />}
                  {issue.status === Status.CLOSED &&
                    !issue.archived &&
                    !onlooker && <ArchiveButton issue={issue} />}
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

const toggleOrder = (currentOrder: "asc" | "desc" | undefined) => {
  return currentOrder === undefined
    ? "asc"
    : currentOrder === "asc"
    ? "desc"
    : "asc";
};

export default IssueTable;
