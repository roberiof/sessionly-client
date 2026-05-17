# Backend Integration

This comprehensive guide shows how to implement complete backend integration in Next.js, from initial setup to advanced features like infinite pagination and file uploads.

## Table of Contents

1. [File Structure](#file-structure)
2. [Initial Configuration](#initial-configuration)
3. [Creating an API Module](#creating-an-api-module)
   - [Manual Method](#manual-method)
   - [Using the API Generator](#using-the-api-generator)
4. [TanStack Query Hooks](#tanstack-query-hooks)
5. [Error Handling](#error-handling)
6. [Cache Invalidation](#cache-invalidation)
7. [Infinite Pagination](#infinite-pagination)
8. [TanStack Table Integration](#tanstack-table-integration)
9. [File Uploads](#file-uploads)
10. [Best Practices](#best-practices)

## File Structure

The Next.js architecture follows an organized pattern for APIs:

```
src/
├── api/                         # API modules
│   └── [entity]/                # Ex: product, user, order
│       ├── config.ts            # Endpoints, query keys, mutation keys
│       ├── types.ts             # TypeScript types
│       ├── endpoints.ts         # API functions
│       └── hooks/               # React Query hooks
│           ├── index.ts
│           ├── useGet[Entity].tsx
│           ├── useGet[Entity]ById.tsx
│           ├── useGetInfinite[Entity].tsx
│           ├── useCreate[Entity].tsx
│           ├── useUpdate[Entity].tsx
│           └── useDelete[Entity].tsx
├── lib/
│   ├── httpClient/              # Configured HTTP client
│   └── react-query/             # React Query utilities
└── modules/                     # Components that consume the APIs
    └── [feature]/
        └── pages/
```

### Function of Each File

- **`config.ts`**: Centralizes endpoints, query keys, and mutation keys
- **`types.ts`**: Defines all TypeScript types for the entity
- **`endpoints.ts`**: Implements the functions that make HTTP calls
- **`hooks/`**: Contains custom React Query hooks

## Initial Configuration

### 1. Configure Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_ENVIRONMENT=development
```

### 2. HTTP Client

Next.js uses `ky` as the HTTP client. The configuration is already ready in `src/lib/httpClient/index.ts`:

```typescript
import ky from 'ky';
import { API_URL } from '@/config';

const httpClient = {
  authorized: () => kyConfig.extend({
    hooks: {
      beforeRequest: [authorizedRequestHook],
      beforeError: [unauthorizedErrorHook],
    },
  }),
  unauthorized: () => kyConfig.extend({
    hooks: {
      beforeRequest: [],
      beforeError: [],
    },
  }),
};
```

## Creating an API Module

Next.js offers two ways to create API modules: manually (for more control) or using the API Generator (for speed and consistency).

### Manual Method

Let's create a complete module for a `Product` entity manually:

#### 1. Types (`src/api/product/types.ts`)

```typescript
import { BaseEntity, GetManyResponse } from '@/types';

export type Product = BaseEntity & {
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  inStock: boolean;
};

export type GetProductsResponse = GetManyResponse<Product>;

export type GetProductsParams = {
  skip: number;
  take: number;
  search?: string;
  category?: string;
};

export type GetProductByIdParams = {
  productId: string;
};

export type CreateProductBody = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateProductBody = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>> & {
  productId: Product['id'];
};

export type DeleteProductParams = {
  productId: string;
};
```

#### 2. Configuration (`src/api/product/config.ts`)

```typescript
import { defineQueryKey, defineMutationKey } from '@/lib/react-query/utils';
import { defineRoute } from '@/utils/functions';

export const PRODUCT_ENDPOINTS = {
  getProducts: defineRoute(() => '/products'),
  getProductById: defineRoute<GetProductByIdParams>(({ productId }) => `/products/${productId}`),
  createProduct: defineRoute(() => '/products'),
  updateProduct: defineRoute<Pick<UpdateProductBody, 'productId'>>(({ productId }) => `/products/${productId}`),
  deleteProduct: defineRoute<Pick<DeleteProductParams, 'productId'>>(({ productId }) => `/products/${productId}`),
} as const;

export const PRODUCT_QUERY_KEYS = {
  getProducts: defineQueryKey('products'),
  getProductById: defineQueryKey<GetProductByIdParams>('product-by-id'),
  getInfiniteProducts: defineQueryKey<Omit<GetProductsParams, 'skip'>>('infinite-products'),
} as const;

export const PRODUCT_MUTATION_KEYS = {
  createProduct: defineMutationKey('create-product'),
  updateProduct: defineMutationKey('update-product'),
  deleteProduct: defineMutationKey('delete-product'),
} as const;
```

#### 3. Endpoints (`src/api/product/endpoints.ts`)

```typescript
import httpClient from '@/lib/httpClient';
import { defineEndpoint } from '@/utils/functions';
import { PRODUCT_ENDPOINTS } from './config';

export const getProducts = defineEndpoint<GetProductsResponse, GetProductsParams>(
  async (searchParams) => {
    const response = await httpClient.authorized().get(PRODUCT_ENDPOINTS.getProducts(), {
      searchParams
    });
    return await response.json<GetProductsResponse>();
  }
);

export const getProductById = defineEndpoint<GetProductByIdResponse, GetProductByIdParams>(
  async ({ productId }) => {
    const response = await httpClient.authorized().get(PRODUCT_ENDPOINTS.getProductById({ productId }));
    return await response.json<GetProductByIdResponse>();
  }
);

export const createProduct = defineEndpoint<CreateProductResponse, CreateProductBody>(
  async (product) => {
    const response = await httpClient.authorized().post(PRODUCT_ENDPOINTS.createProduct(), {
      json: product,
    });
    return await response.json<CreateProductResponse>();
  }
);

export const updateProduct = defineEndpoint<UpdateProductResponse, UpdateProductBody>(
  async ({ productId, ...product }) => {
    const response = await httpClient.authorized().put(PRODUCT_ENDPOINTS.updateProduct({ productId }), {
      json: product,
    });
    return await response.json<UpdateProductResponse>();
  }
);

export const deleteProduct = defineEndpoint<void, DeleteProductParams>(
  async ({ productId }) => {
    await httpClient.authorized().delete(PRODUCT_ENDPOINTS.deleteProduct({ productId }));
  }
);
```

## TanStack Query Hooks

### 1. List Hook (`useGetProducts.tsx`)

```typescript
import { useQuery } from '@tanstack/react-query';
import { defineQuery } from '@/lib/react-query';
import { PRODUCT_QUERY_KEYS } from '../config';
import { getProducts } from '../endpoints';

export const useGetProducts = defineQuery<GetProductsResponse, GetProductsParams>(
  ({ options, params }) =>
    useQuery({
      ...options,
      queryKey: [PRODUCT_QUERY_KEYS.getProducts(), params],
      queryFn: () => getProducts(params),
    })
);
```

### 2. Create Hook (`useCreateProduct.tsx`)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { defineMutation } from '@/lib/react-query';
import { PRODUCT_MUTATION_KEYS, PRODUCT_QUERY_KEYS } from '../config';

export const useCreateProduct = defineMutation<CreateProductResponse, CreateProductBody>(
  ({ options }) => {
    const queryClient = useQueryClient();

    return useMutation({
      ...options,
      mutationKey: PRODUCT_MUTATION_KEYS.createProduct(),
      mutationFn: (product) => createProduct(product),
      onSuccess: (response) => {
        // Invalidate list cache
        queryClient.invalidateQueries({
          queryKey: PRODUCT_QUERY_KEYS.getProducts({ exact: false }),
        });

        // Add new item to cache
        queryClient.setQueryData<GetProductByIdResponse>(
          PRODUCT_QUERY_KEYS.getProductById({ productId: response.id }),
          () => response
        );
      },
    });
  }
);
```

### 3. Using Hooks in Components

```typescript
function ProductList() {
  const [page, setPage] = useState(1);

  // Fetch products
  const { data, isLoading, error } = useGetProducts({
    params: { skip: (page - 1) * 10, take: 10 }
  });

  // Create product
  const createMutation = useCreateProduct({
    options: {
      onSuccess: () => {
        toast.success('Product created successfully!');
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    },
  });

  const handleCreate = (productData: CreateProductBody) => {
    createMutation.mutate(productData);
  };

  if (isLoading) return <Skeleton />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Error Handling

### 1. Global Error Configuration

```typescript
// src/lib/react-query/query-client.ts
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    },
  },
});
```

### 2. Hook-Specific Error Handling

```typescript
const { data, error, isError } = useGetProducts({
  params: { skip: 0, take: 10 },
  options: {
    onError: (error) => {
      console.error('Error loading products:', error);
      // Handle error based on error type
      if (error.status === 404) {
        toast.error('Products not found');
      } else if (error.status >= 500) {
        toast.error('Server error');
      }
    },
    retry: false, // Disable retry for this specific query
  },
});
```

### 3. Error Boundary

```typescript
// components/ErrorBoundary.tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={reset}
        >
          <ProductList />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
```

## Cache Invalidation

### 1. Manual Invalidation

```typescript
const queryClient = useQueryClient();

// Invalidate all product queries
queryClient.invalidateQueries({
  queryKey: PRODUCT_QUERY_KEYS.getProducts({ exact: false })
});

// Invalidate specific query
queryClient.invalidateQueries({
  queryKey: PRODUCT_QUERY_KEYS.getProductById({ productId: '1' })
});
```

### 2. Automatic Invalidation in Mutations

```typescript
export const useUpdateProduct = defineMutation<UpdateProductResponse, UpdateProductBody>(
  ({ options }) => {
    const queryClient = useQueryClient();

    return useMutation({
      ...options,
      mutationFn: ({ productId, ...product }) => updateProduct({ productId, ...product }),
      onSuccess: (response, { productId }) => {
        // Invalidate lists
        queryClient.invalidateQueries({
          queryKey: PRODUCT_QUERY_KEYS.getProducts({ exact: false }),
        });

        // Update specific item in cache
        queryClient.setQueryData<GetProductByIdResponse>(
          PRODUCT_QUERY_KEYS.getProductById({ productId }),
          (oldProduct) => ({
            ...(oldProduct ?? {}),
            ...response,
          })
        );
      },
    });
  }
);
```

### 3. Optimistic Update

```typescript
export const useToggleProductStock = defineMutation<Product, { productId: string }>(
  ({ options }) => {
    const queryClient = useQueryClient();

    return useMutation({
      ...options,
      mutationFn: ({ productId }) => toggleProductStock({ productId }),
      // Optimistic update
      onMutate: async ({ productId }) => {
        await queryClient.cancelQueries({
          queryKey: PRODUCT_QUERY_KEYS.getProductById({ productId })
        });

        const previousProduct = queryClient.getQueryData<Product>(
          PRODUCT_QUERY_KEYS.getProductById({ productId })
        );

        queryClient.setQueryData<Product>(
          PRODUCT_QUERY_KEYS.getProductById({ productId }),
          (old) => old ? { ...old, inStock: !old.inStock } : undefined
        );

        return { previousProduct };
      },
      // Revert on error
      onError: (err, { productId }, context) => {
        queryClient.setQueryData(
          PRODUCT_QUERY_KEYS.getProductById({ productId }),
          context?.previousProduct
        );
      },
      // Always refetch after mutation
      onSettled: (data, error, { productId }) => {
        queryClient.invalidateQueries({
          queryKey: PRODUCT_QUERY_KEYS.getProductById({ productId })
        });
      },
    });
  }
);
```

## Infinite Pagination

### 1. Infinite Pagination Hook

```typescript
// useGetInfiniteProducts.tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { defineInfiniteQuery } from '@/lib/react-query';

export const useGetInfiniteProducts = defineInfiniteQuery<
  GetProductsResponse,
  Omit<GetProductsParams, 'skip'>
>(({ options, params }) =>
  useInfiniteQuery({
    ...options,
    queryKey: PRODUCT_QUERY_KEYS.getInfiniteProducts(params),
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        ...params,
        skip: pageParam,
        take: params.take ?? 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = allPages.reduce((acc, page) => acc + page.data.length, 0);
      const total = lastPage.total_items;
      return fetchedCount < total ? fetchedCount : undefined;
    },
    initialPageParam: 0,
  })
);
```

### 2. Component with Infinite Scroll

```typescript
function InfiniteProductList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteProducts({
    params: { take: 10 }
  });

  const observerRef = useRef<IntersectionObserver>();

  const lastProductElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [isLoading, fetchNextPage, hasNextPage]);

  const allProducts = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <div className="grid gap-4">
      {allProducts.map((product, index) => {
        const isLast = index === allProducts.length - 1;
        return (
          <ProductCard
            key={product.id}
            ref={isLast ? lastProductElementRef : null}
            product={product}
          />
        );
      })}

      {isFetchingNextPage && (
        <div className="text-center">
          <Spinner />
          <p>Loading more products...</p>
        </div>
      )}
    </div>
  );
}
```

## TanStack Table Integration

### 1. Basic Configuration

```bash
yarn add @tanstack/react-table
```

### 2. Hook for Table with Server-Side

```typescript
// hooks/useProductTable.ts
import { useGetProducts } from '@/api/product/hooks';
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

export function useProductTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const { data, isLoading } = useGetProducts({
    params: {
      skip: pagination.pageIndex * pagination.pageSize,
      take: pagination.pageSize,
      search: globalFilter,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
    }
  });

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ getValue }) => formatCurrency(getValue()),
    },
    {
      accessorKey: 'inStock',
      header: 'In Stock',
      cell: ({ getValue }) => (
        <Badge variant={getValue() ? 'success' : 'destructive'}>
          {getValue() ? 'Yes' : 'No'}
        </Badge>
      ),
    },
  ], []);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: Math.ceil((data?.total_items ?? 0) / pagination.pageSize),
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return {
    table,
    isLoading,
    pagination,
    globalFilter,
    setGlobalFilter,
  };
}
```

### 3. Table Component

```typescript
function ProductTable() {
  const { table, isLoading, globalFilter, setGlobalFilter } = useProductTable();

  return (
    <div className="space-y-4">
      {/* Global Filter */}
      <Input
        placeholder="Search products..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## File Uploads

### 1. Upload Endpoint

```typescript
// endpoints.ts
export const uploadProductImage = defineEndpoint<{ url: string }, FormData>(
  async (formData) => {
    const response = await httpClient.authorized().post('/products/upload', {
      body: formData,
    });
    return await response.json<{ url: string }>();
  }
);
```

### 2. Upload Hook

```typescript
// useUploadProductImage.tsx
import { useMutation } from '@tanstack/react-query';
import { defineMutation } from '@/lib/react-query';

export const useUploadProductImage = defineMutation<{ url: string }, FormData>(
  ({ options }) => {
    return useMutation({
      ...options,
      mutationFn: (formData) => uploadProductImage(formData),
      onSuccess: (data) => {
        toast.success('Image uploaded successfully!');
      },
      onError: (error) => {
        toast.error(`Upload error: ${error.message}`);
      },
    });
  }
);
```

### 3. Upload Component

```typescript
function ImageUpload({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadProductImage({
    options: {
      onSuccess: (data) => {
        onUploadComplete(data.url);
        setPreview(data.url);
      },
    },
  });

  const handleFiles = useCallback((files: FileList) => {
    const file = files[0];
    if (!file) return;

    // Validations
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum 5MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Only images are allowed.');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', 'products');

    uploadMutation.mutate(formData);
  }, [uploadMutation]);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          dragActive ? "border-primary bg-primary/10" : "border-gray-300",
          uploadMutation.isPending && "pointer-events-none opacity-50"
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        {uploadMutation.isPending ? (
          <div className="flex items-center justify-center space-x-2">
            <Spinner className="h-4 w-4" />
            <span>Uploading...</span>
          </div>
        ) : (
          <div>
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              Click to select or drag an image here
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG up to 5MB
            </p>
          </div>
        )}
      </div>

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-32 object-cover rounded-lg"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              setPreview(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
```

### 4. Multiple Upload

```typescript
function MultipleImageUpload({ onUploadComplete }: { onUploadComplete: (urls: string[]) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const uploadMutation = useUploadProductImage({
    options: {
      onSuccess: (data, variables, context) => {
        // Logic for multiple uploads
      },
    },
  });

  const handleMultipleFiles = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList);

    // Validate each file
    const validFiles = newFiles.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum 5MB.`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a valid image.`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);

    // Generate previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const uploadAll = async () => {
    const uploadPromises = files.map(file => {
      const formData = new FormData();
      formData.append('image', file);
      return uploadProductImage(formData);
    });

    try {
      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.url);
      onUploadComplete(urls);
      toast.success(`${urls.length} images uploaded successfully!`);
    } catch (error) {
      toast.error('Error uploading some images.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop area similar to previous example */}

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-20 object-cover rounded"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0"
                onClick={() => {
                  setFiles(prev => prev.filter((_, i) => i !== index));
                  setPreviews(prev => prev.filter((_, i) => i !== index));
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <Button
          onClick={uploadAll}
          disabled={uploadMutation.isPending}
          className="w-full"
        >
          {uploadMutation.isPending ? 'Uploading...' : `Upload ${files.length} image(s)`}
        </Button>
      )}
    </div>
  );
}
```

## Best Practices

### 1. Code Organization

- **Separation of concerns**: Each file has a specific function
- **Strong typing**: Use TypeScript for all data types
- **Consistent naming**: Follow project patterns
- **Reusability**: Create reusable hooks and utilities

### 2. Performance

```typescript
// Use staleTime to avoid unnecessary requests
const { data } = useGetProducts({
  params: { skip: 0, take: 10 },
  options: {
    staleTime: 5 * 60 * 1000, // 5 minutes
  }
});

// Use select to transform data
const { data: productNames } = useGetProducts({
  params: { skip: 0, take: 100 },
  options: {
    select: (data) => data.data.map(product => product.name),
  }
});
```

### 3. State Handling

```typescript
function ProductList() {
  const { data, isLoading, isError, error, isFetching } = useGetProducts({
    params: { skip: 0, take: 10 }
  });

  // Initial loading
  if (isLoading) return <ProductListSkeleton />;

  // Error
  if (isError) return <ErrorMessage error={error} />;

  // Success with refetch loading
  return (
    <div>
      {isFetching && <LoadingIndicator />}
      <ProductGrid products={data?.data ?? []} />
    </div>
  );
}
```

### 4. Tests

```typescript
// __tests__/useGetProducts.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetProducts } from '../useGetProducts';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

test('should fetch products', async () => {
  const { result } = renderHook(
    () => useGetProducts({ params: { skip: 0, take: 10 } }),
    { wrapper: createWrapper() }
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data?.data).toHaveLength(10);
});
```

### 5. Debugging

```typescript
// Add development logs
const { data, isLoading } = useGetProducts({
  params: { skip: 0, take: 10 },
  options: {
    onSuccess: (data) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Products loaded:', data);
      }
    },
    onError: (error) => {
      console.error('Failed to load products:', error);
    },
  }
});
```

## Conclusion

This documentation provides a complete guide for implementing backend integrations in Next.js. The modular architecture and use of TanStack Query ensure:

- **Type Safety**: Complete TypeScript typing
- **Performance**: Smart caching and automatic optimizations
- **Maintainability**: Organized and reusable code
- **User Experience**: Loading states, errors, and optimistic updates
- **Scalability**: Patterns that work for small and large projects

Remember to always follow best practices and adapt the examples to your project's specific needs.
