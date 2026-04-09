"use client"

import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { TablePaginationState } from "../../types/table"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

type TablePaginationProps = React.ComponentProps<"div"> & {
  pagination: TablePaginationState
  pageCount: number
  totalItems?: number
  pageSizeOptions?: number[]
  disabled?: boolean
  onPaginationChange: (pagination: TablePaginationState) => void
}

function TablePagination({
  className,
  pagination,
  pageCount,
  totalItems,
  pageSizeOptions = [5, 10, 25, 50],
  disabled = false,
  onPaginationChange,
  ...props
}: TablePaginationProps) {
  const safePageCount = Math.max(1, pageCount)
  const safePageIndex = Math.min(
    Math.max(0, pagination.pageIndex),
    safePageCount - 1,
  )
  const canPreviousPage = !disabled && safePageIndex > 0
  const canNextPage = !disabled && safePageIndex < safePageCount - 1

  const startItem = totalItems
    ? safePageIndex * pagination.pageSize + 1
    : undefined
  const endItem = totalItems
    ? Math.min((safePageIndex + 1) * pagination.pageSize, totalItems)
    : undefined

  return (
    <div
      data-slot="table-pagination"
      className={cn(
        "flex w-full items-center justify-end gap-3 pt-3 text-sm",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Rows per page</span>
        <div className="relative">
          <select
            aria-label="Rows per page"
            className="h-8 rounded-md border border-input bg-background px-2 pr-7 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            value={pagination.pageSize}
            disabled={disabled}
            onChange={(event) =>
              onPaginationChange({
                pageIndex: 0,
                pageSize: Number(event.target.value),
              })
            }
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {typeof startItem === "number" && typeof endItem === "number" ? (
        <span className="text-muted-foreground">
          {startItem}-{endItem} of {totalItems}
        </span>
      ) : null}

      <span className="text-muted-foreground">
        Page {safePageIndex + 1} of {safePageCount}
      </span>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: Math.max(0, safePageIndex - 1),
            })
          }
          disabled={!canPreviousPage}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: Math.min(safePageCount - 1, safePageIndex + 1),
            })
          }
          disabled={!canNextPage}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TablePagination,
}

export type { TablePaginationProps }
