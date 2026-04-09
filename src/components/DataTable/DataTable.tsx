"use client"

import type { ReactNode } from "react"
import type { TablePaginationState } from "@/types/table"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@/components/ui/table"

type DataTableBaseColumn = {
  header: ReactNode
  headClassName?: string
  cellClassName?: string
}

export type DataTableKeyColumn<
  TRow,
  TKey extends keyof TRow = keyof TRow,
> = DataTableBaseColumn & {
  kind: "key"
  key: TKey
  id?: string
  renderValue?: (value: TRow[TKey], row: TRow, rowIndex: number) => ReactNode
}

export type DataTableCustomColumn<TRow> = DataTableBaseColumn & {
  kind: "custom"
  id: string
  renderCell: (row: TRow, rowIndex: number) => ReactNode
}

export type DataTableColumn<TRow> =
  | DataTableKeyColumn<TRow>
  | DataTableCustomColumn<TRow>

type DataTablePaginationConfig = {
  pagination: TablePaginationState
  onPaginationChange: (pagination: TablePaginationState) => void
  pageSizeOptions?: number[]
  disabled?: boolean
  className?: string
}

type DataTableProps<TRow> = {
  data: TRow[]
  columns: DataTableColumn<TRow>[]
  caption?: ReactNode
  emptyState?: ReactNode
  getRowKey?: (row: TRow, rowIndex: number) => string
  pagination?: DataTablePaginationConfig
}

export function DataTable<TRow>({
  data,
  columns,
  caption,
  emptyState = "No data available.",
  getRowKey,
  pagination,
}: DataTableProps<TRow>) {
  const totalItems = data.length
  const getColumnId = (column: DataTableColumn<TRow>) =>
    column.kind === "custom" ? column.id : (column.id ?? String(column.key))

  const renderCellContent = (
    column: DataTableColumn<TRow>,
    row: TRow,
    rowIndex: number,
  ) => {
    if (column.kind === "custom") {
      return column.renderCell(row, rowIndex)
    }

    const value = row[column.key]

    if (column.renderValue) {
      return column.renderValue(value, row, rowIndex)
    }

    if (value === null || value === undefined) return ""
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "bigint"
    ) {
      return String(value)
    }

    return String(value)
  }

  const paginatedData = (() => {
    if (!pagination) return data

    const pageCount = Math.max(
      1,
      Math.ceil(totalItems / pagination.pagination.pageSize),
    )
    const safePageIndex = Math.min(
      Math.max(0, pagination.pagination.pageIndex),
      pageCount - 1,
    )
    const start = safePageIndex * pagination.pagination.pageSize
    const end = start + pagination.pagination.pageSize

    return data.slice(start, end)
  })()

  const pageCount = pagination
    ? Math.max(1, Math.ceil(totalItems / pagination.pagination.pageSize))
    : 1

  return (
    <div className="w-full">
      <Table>
        {caption ? <TableCaption>{caption}</TableCaption> : null}
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={getColumnId(column)}
                className={column.headClassName}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <TableRow
                key={getRowKey ? getRowKey(row, rowIndex) : String(rowIndex)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={getColumnId(column)}
                    className={column.cellClassName}
                  >
                    {renderCellContent(column, row, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyState}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination ? (
        <TablePagination
          pagination={pagination.pagination}
          pageCount={pageCount}
          totalItems={totalItems}
          pageSizeOptions={pagination.pageSizeOptions}
          disabled={pagination.disabled}
          onPaginationChange={pagination.onPaginationChange}
          className={pagination.className}
        />
      ) : null}
    </div>
  )
}
