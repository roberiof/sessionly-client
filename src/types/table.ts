export type TablePaginationState = {
  pageIndex: number
  pageSize: number
}

export type BackendTablePaginationMeta = TablePaginationState & {
  totalItems: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type BackendPaginatedTableResponse<T> = {
  data: T[]
  pagination: BackendTablePaginationMeta
}
