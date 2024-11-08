import { Issue } from "@prisma/client";

export interface Column {
  label: string;
  value: keyof Issue;
  className?: "hidden md:table-cell";
}

const columns: Column[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const archivedColumns: Column[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Updated", value: "updatedAt", className: "hidden md:table-cell" },
];

const columnNames = columns.map((column) => column.value);
const archivedColumnNames = archivedColumns.map((column) => column.value);

export { columns, archivedColumns, columnNames, archivedColumnNames };
