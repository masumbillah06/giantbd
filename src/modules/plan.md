# GiantBD — Module-Based Architecture Plan

> **No files were created, edited, or deleted.** This is a pure analysis and recommendation document.

---

## 1. Current Architecture Assessment

### What the project is

An ERP-style warehouse/inventory management dashboard for **Giant BD Co. Limited** (footwear/apparel). It includes:

| Domain | Routes |
|---|---|
| Inventory (Warehouse FG) | Dashboard, Stock In, Stock Out, Stock Out List, Batch List |
| FG Reports (9 sub-routes) | Weekly/Monthly Delivery, Delivery Summary, Stock Aging, Master Stock, Location-Wise Stock, Batch Product List, FG Current Stock, Stock Ledger |
| Products | Master FG Product, Variant FG Product |
| CRM | Buyer |
| Attributes | Category, Sub-Category, Material, Color, Warehouse, Zone, Sub-Zone, Rack |
| IAM | Role, Permission, User |
| Auth | Login, Forgot Password |

### Current folder structure (annotated)

```
src/
├── app/
│   ├── layout.tsx               # Root layout — mounts SidebarProvider
│   ├── page.tsx                 # Redirect → /login
│   ├── login/page.tsx           # Auth page (all-in-one, 197 lines)
│   └── (dashboard)/
│       ├── layout.tsx           # DashboardShell (sidebar + header + footer)
│       ├── attribute/           # 8 sub-routes, mostly stub pages
│       ├── crm/buyer/
│       ├── inventory/           # Dashboard, stock-in, stock-out, batch-list, fg-reports/…
│       ├── permission/
│       ├── products/            # master-fg-product, variant-fg-product
│       ├── role/
│       └── user/
├── components/
│   ├── dashboard/               # Chart components (bar, donut, line, pie, stat-card)
│   ├── delivery/                # Delivery-specific presentational components
│   ├── layout/                  # Sidebar, Header, Footer, SidebarContext, SidebarNavItem
│   ├── stock-in/                # BasicInfo, Documents, Remarks, StockInContext, StockInActions
│   ├── stock-out/               # BasicInfo, CreateLcPo, ProductDetails, StockOut (root)
│   └── ui/                      # Shared UI primitives
│       ├── breadcrumb.tsx
│       ├── dynamic-filter-bar.tsx
│       ├── filter-card.tsx
│       ├── form-action-bar.tsx
│       ├── period-selector.tsx
│       ├── SearchDropdown.tsx
│       ├── select.tsx
│       ├── table-toolbar.tsx
│       ├── buttons/             # ActionButton, ActionButtonGroup
│       └── tables/              # ReusableTable, ReusableTable.types, PaginatedTable, Pagination, MatrixTable
├── hooks/
│   └── use-client-pagination.ts
├── lib/
│   ├── attribute-data/          # 9 files: buyer, category, color, material, rack, sub-category, sub-zone, warehouse, zone
│   ├── constants/
│   │   └── inventory-options.ts
│   ├── product-data/            # 11 files: batch, batch-product, dashboard, delivery-summary, master, master-monthly-delivery, permission, product, stock-aging, stockout-list, weekly-delivery
│   ├── dashboard-data.tsx       # (duplicate — also exists inside product-data/)
│   ├── sidebar-nav-data.ts      # NavItem type + sidebarNav config
│   ├── text.txt                 # Scratch/temp file
│   ├── theme.ts                 # CSS variable helpers
│   └── utils.ts                 # Re-exports `cn` from the `cn` package
└── modules/                     # EMPTY — placeholder only
```

---

## 2. What is Already Good ✅

| Strength | Detail |
|---|---|
| **`PaginatedTable` dual-mode design** | Already supports both `"client"` (mock) and `"server"` (API) mode via a single component. Migration to server pagination requires zero UI changes. |
| **`useClientPagination` hook** | Well-extracted, reusable, generic, timer-safe. |
| **`StockInContext` pattern** | Clean use of React Context + Provider to share form state across multi-section forms. This is the right pattern. |
| **`ReusableTable` + `ColumnDef`** | Generic table rendering with typed columns. Can be kept as-is. |
| **`DynamicFilterBar`** | Type-safe generic filter bar — exactly the kind of shared primitive needed. |
| **Strict TypeScript** | `strict: true` is configured. Interfaces exist across most data files. |
| **Route group `(dashboard)`** | Correct use of App Router route groups for shared layout. |
| **`SidebarProvider` at root** | Correctly placed for cross-layout sidebar state. |
| **`TableToolbar`** | Highly configurable via props — good for reuse with real API callbacks. |

---

## 3. What Should Change ⚠️

| Issue | Location | Problem |
|---|---|---|
| **Mock data lives in `lib/`** | `lib/product-data/`, `lib/attribute-data/` | `lib/` is for utilities and config, not domain data. These files mix types, column definitions, and hardcoded records. |
| **Types scattered in components** | `FGProductItem` in `basic-info.tsx`, `DocumentItem` in `documents.tsx`, `BasicInfoData` in `stock-out/basic-info.tsx` | Types belong in a dedicated types file per feature, not inside component files. |
| **Feature components in `components/`** | `stock-in/`, `stock-out/`, `delivery/`, `dashboard/` | Feature-specific components should live inside the feature module, not in a global `components/` folder. |
| **Column definitions co-located with data** | Every `*-data.ts` file exports both the data records and the `ColumnDef` | Column definitions are UI concerns; row types are domain concerns. Mixing them creates a coupling between data layer and UI layer. |
| **Business logic in Context** | `StockInContext.handleCreate` does a `setTimeout`-simulated API call | Business logic and API calls should not live in React Contexts. Context is for sharing state; services are for operations. |
| **Duplicate logic in pages** | `master-fg-product/page.tsx` re-implements its own pagination (manual `useState`, `useMemo`, `Pagination`) instead of using `PaginatedTable` | Inconsistent table pattern across pages. |
| **Inline data + types in page files** | `role/page.tsx` and `user/page.tsx` define their `UserRecord` interface and `const requisitionData` directly inside the page file | Pages should import data; they should not be data stores. |
| **`lib/dashboard-data.tsx` duplicate** | Both `src/lib/dashboard-data.tsx` and `src/lib/product-data/dashboard-data.tsx` exist | Clear accidental duplication. |
| **`lib/text.txt`** | Scratch/leftover file in `lib/` | Should be deleted. |
| **`modules/` is empty** | `src/modules/` was created with intent but never populated | The naming implies a feature-module pattern but it was never completed. |
| **No API layer at all** | Everything uses hardcoded mock objects | When API integration begins, there is no obvious place for HTTP clients, request/response types, or service functions. |
| **No authentication guard** | Login page just does `router.push('/inventory/dashboard')` — no token, no session | No middleware, no route protection. Will become a security gap immediately. |
| **`SidebarProvider` mounted in root layout** | This makes the sidebar state available even on the login page | Sidebar context is irrelevant on public routes. |
| **`components/ui/SearchDropdown.tsx`** | PascalCase filename breaks convention in the `ui/` folder (all others are kebab-case) | Minor but creates import inconsistency. |

---

## 4. What Could Become Problematic at Scale 🔴

| Risk | Why it Matters |
|---|---|
| **No module boundaries** | As features grow, `components/stock-in`, `components/stock-out`, `components/delivery` will all import from the same shared `lib/product-data/` pool, creating a web of implicit dependencies. It becomes unclear what belongs to what feature. |
| **Types are not separated from data** | When the API arrives, you'll want to define a `BatchItem` DTO that matches the API response, but right now `BatchItem` is declared next to 517 lines of mock rows in `batch-data.ts`. Decoupling requires touching many files. |
| **`handleCreate` in Context** | As the app grows, you'll need optimistic updates, error boundaries, cache invalidation, retry logic. None of these belong in a React Context. |
| **Pagination inconsistency** | Three different ways of handling table pagination exist right now (`PaginatedTable`, manual `useState`+`useMemo`+`Pagination`, bare `ReusableTable`). This will multiply. |
| **No loading/error states on list pages** | List pages render synchronously from mock arrays. When APIs arrive, every list page needs loading skeletons, error states, retry, and empty states. The `PaginatedTable` already supports these via props — it just needs to be adopted consistently. |
| **No caching layer** | Without a data-fetching library (React Query / SWR), API calls will be managed inconsistently — some in `useEffect`, some in Server Components, some in Contexts. |
| **Authentication** | The current login is a UI-only animation. When a real auth API is integrated, there is no middleware, no token storage strategy, no session type, and no way to protect routes. |

---

## 5. Recommended Architecture

### Design Principles

1. **Feature-first, not type-first** — Code is organized around business capabilities, not technical categories.
2. **`app/` is routing only** — Pages are thin orchestrators; no business logic lives there.
3. **`components/ui/` is truly shared** — Only headless/atomic primitives go here.
4. **Features own their own code** — Types, hooks, services, and presentational components all live inside the feature directory.
5. **`lib/` is infrastructure** — HTTP client, global constants, utility functions, and validation helpers only.
6. **The API layer flows in one direction**: `page → hook → service → API client → API`

---

### Proposed Folder Structure

```
src/
├── app/                                  # Routing ONLY — thin pages, layouts, route groups
│   ├── layout.tsx                        # Root HTML shell (fonts, global CSS)
│   ├── page.tsx                          # Redirect to /login
│   ├── login/
│   │   └── page.tsx
│   └── (dashboard)/
│       ├── layout.tsx                    # DashboardShell (sidebar + header + footer)
│       ├── inventory/
│       │   ├── dashboard/page.tsx
│       │   ├── stock-in/page.tsx
│       │   ├── stock-out/page.tsx
│       │   ├── stock-out-list/page.tsx
│       │   ├── batch-list/page.tsx
│       │   └── fg-reports/
│       │       ├── weekly-delivery/page.tsx
│       │       ├── monthly-delivery/page.tsx
│       │       ├── delivery-summary/page.tsx
│       │       ├── stock-aging/page.tsx
│       │       ├── fg-master-stock/page.tsx
│       │       ├── location-wise-stock/page.tsx
│       │       ├── batch-product-list/page.tsx
│       │       ├── fg-current-stock/page.tsx
│       │       └── stock-ledger/page.tsx
│       ├── products/
│       │   ├── master-fg-product/page.tsx
│       │   └── variant-fg-product/page.tsx
│       ├── crm/buyer/page.tsx
│       ├── attribute/
│       │   ├── page.tsx
│       │   ├── category/page.tsx
│       │   └── … (other sub-routes)
│       ├── role/page.tsx
│       ├── permission/page.tsx
│       └── user/page.tsx
│
├── features/                             # NEW — one directory per business domain
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   └── forgot-password-form.tsx
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── services/
│   │   │   └── auth.service.ts          # login(), logout(), refreshToken()
│   │   └── types/
│   │       └── auth.types.ts            # LoginRequest, LoginResponse, Session
│   │
│   ├── inventory/
│   │   ├── components/
│   │   │   ├── stock-in/
│   │   │   │   ├── basic-info.tsx
│   │   │   │   ├── documents.tsx
│   │   │   │   ├── remarks.tsx
│   │   │   │   ├── stock-in-actions.tsx
│   │   │   │   └── stock-in-form.tsx    # Replaces StockInProvider
│   │   │   ├── stock-out/
│   │   │   │   ├── basic-info.tsx
│   │   │   │   ├── create-lc-po.tsx
│   │   │   │   ├── product-details.tsx
│   │   │   │   └── stock-out-form.tsx
│   │   │   └── batch-list/
│   │   │       └── batch-table.tsx
│   │   ├── hooks/
│   │   │   ├── use-stock-in.ts          # useQuery/useMutation for stock-in
│   │   │   ├── use-stock-out.ts
│   │   │   └── use-batch-list.ts
│   │   ├── services/
│   │   │   └── inventory.service.ts     # getStockIn(), createStockIn(), etc.
│   │   └── types/
│   │       └── inventory.types.ts       # FGProductItem, DocumentItem, BatchItem, etc.
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── bar-chart.tsx
│   │   │   ├── donut-chart.tsx
│   │   │   ├── line-chart.tsx
│   │   │   ├── pie-chart.tsx
│   │   │   └── stat-card.tsx
│   │   ├── hooks/
│   │   │   └── use-dashboard-stats.ts
│   │   ├── services/
│   │   │   └── dashboard.service.ts
│   │   └── types/
│   │       └── dashboard.types.ts       # StatCard data, StockInRow, RequisitionRow
│   │
│   ├── reports/
│   │   ├── components/
│   │   │   ├── delivery-summary/
│   │   │   │   ├── delivery-summary-header.tsx
│   │   │   │   ├── delivery-summary-table.tsx
│   │   │   │   └── index.ts
│   │   │   └── periodic-delivery/
│   │   │       ├── periodic-delivery.tsx
│   │   │       └── periodic-matrix-table.tsx
│   │   ├── hooks/
│   │   │   ├── use-delivery-summary.ts
│   │   │   ├── use-weekly-delivery.ts
│   │   │   └── use-stock-aging.ts
│   │   ├── services/
│   │   │   └── reports.service.ts
│   │   └── types/
│   │       └── reports.types.ts
│   │
│   ├── products/
│   │   ├── components/
│   │   │   ├── master-fg-product-table.tsx
│   │   │   └── variant-fg-product-table.tsx
│   │   ├── hooks/
│   │   │   ├── use-master-products.ts
│   │   │   └── use-variant-products.ts
│   │   ├── services/
│   │   │   └── products.service.ts
│   │   └── types/
│   │       └── product.types.ts         # MasterProduct, VariantProduct
│   │
│   ├── crm/
│   │   ├── components/buyer-table.tsx
│   │   ├── hooks/use-buyers.ts
│   │   ├── services/crm.service.ts
│   │   └── types/crm.types.ts
│   │
│   ├── attributes/
│   │   ├── components/attribute-table.tsx  # Generic — reused by all 8 attribute sub-pages
│   │   ├── hooks/use-attribute.ts
│   │   ├── services/attributes.service.ts
│   │   └── types/attribute.types.ts     # CategoryRecord, ColorRecord, etc.
│   │
│   └── iam/                             # Identity & Access Management
│       ├── components/
│       │   ├── role-table.tsx
│       │   ├── permission-table.tsx
│       │   └── user-table.tsx
│       ├── hooks/
│       │   ├── use-roles.ts
│       │   ├── use-permissions.ts
│       │   └── use-users.ts
│       ├── services/
│       │   └── iam.service.ts
│       └── types/
│           └── iam.types.ts             # Role, Permission, User
│
├── components/                          # Truly shared, feature-agnostic UI primitives ONLY
│   ├── ui/
│   │   ├── breadcrumb.tsx
│   │   ├── dynamic-filter-bar.tsx
│   │   ├── filter-card.tsx
│   │   ├── form-action-bar.tsx
│   │   ├── period-selector.tsx
│   │   ├── search-dropdown.tsx          # Renamed from SearchDropdown.tsx
│   │   ├── select.tsx
│   │   ├── table-toolbar.tsx
│   │   ├── buttons/
│   │   │   ├── action-button.tsx
│   │   │   └── action-button-group.tsx
│   │   └── tables/
│   │       ├── ReusableTable.tsx
│   │       ├── ReusableTable.types.ts
│   │       ├── paginated-table.tsx
│   │       ├── pagination.tsx
│   │       └── matrix-table.tsx
│   └── layout/
│       ├── sidebar.tsx
│       ├── sidebar-nav-item.tsx
│       ├── header.tsx
│       └── footer.tsx
│
├── hooks/                               # Truly shared, feature-agnostic hooks ONLY
│   └── use-client-pagination.ts         # Keep as-is
│
├── lib/                                 # Infrastructure layer
│   ├── api/
│   │   ├── http-client.ts               # NEW — base fetch/axios wrapper
│   │   └── endpoints.ts                 # NEW — all API URL constants
│   ├── auth/
│   │   ├── session.ts                   # Token storage helpers
│   │   └── middleware.ts                # Next.js middleware for route protection
│   ├── constants/
│   │   ├── inventory-options.ts         # Keep as-is
│   │   └── sidebar-nav-data.ts          # Move from lib/ root
│   ├── mock-data/                       # NEW — all mock data CENTRALIZED and clearly labeled
│   │   ├── inventory/
│   │   │   ├── batch.mock.ts
│   │   │   ├── stock-in.mock.ts
│   │   │   └── stock-out.mock.ts
│   │   ├── reports/
│   │   │   ├── delivery-summary.mock.ts
│   │   │   └── weekly-delivery.mock.ts
│   │   ├── products/
│   │   │   └── master-products.mock.ts
│   │   ├── attributes/
│   │   │   ├── category.mock.ts
│   │   │   └── … etc.
│   │   ├── iam/
│   │   │   └── permission.mock.ts
│   │   └── dashboard/
│   │       └── dashboard.mock.ts
│   ├── providers/
│   │   └── sidebar-context.tsx          # Move from components/layout/
│   ├── theme.ts                         # Keep as-is
│   └── utils.ts                         # Keep as-is
│
└── middleware.ts                        # NEW — Next.js route protection
```

---

## 6. Responsibility of Each Directory

| Directory | Responsibility | What Does NOT Belong Here |
|---|---|---|
| `app/` | Route definitions, page-level orchestration, metadata, layouts | Business logic, API calls, component state |
| `features/<domain>/components/` | Feature-specific UI — forms, tables configured for this domain | Generic table primitives, layout components |
| `features/<domain>/hooks/` | Data-fetching hooks (`useQuery`, `useMutation`) and feature-local state hooks | UI component state (`useState` for a dropdown) |
| `features/<domain>/services/` | API call functions — returns typed promises | React state, JSX, side effects |
| `features/<domain>/types/` | Domain entity types, DTOs, API request/response shapes | Column definitions (those stay in feature components) |
| `components/ui/` | Headless, feature-agnostic UI primitives | Feature-specific logic, API calls |
| `components/layout/` | App shell components: sidebar, header, footer | Business-domain components |
| `hooks/` | Generic utility hooks reusable across features | Feature-specific query hooks |
| `lib/api/` | HTTP client, base URL configuration, auth header injection | Business logic |
| `lib/auth/` | Token management, session helpers, middleware | User profile data (that's a feature concern) |
| `lib/constants/` | Static app-wide constants, nav config, dropdown options | Mock data |
| `lib/mock-data/` | Hardcoded mock data for development — clearly namespaced | Types (those go in `features/<domain>/types/`) |
| `lib/providers/` | Global React context providers | Feature-local contexts |

---

## 7. Module Boundaries & Communication Rules

### The Dependency Rule (one-way flow)

```
app/ → features/ → lib/api/ → External API
         ↑
    components/ui/ (no upward deps)
    hooks/ (no upward deps)
```

### What should be shared globally vs kept in a feature

| Concern | Global (`components/` or `lib/`) | Feature (`features/<domain>/`) |
|---|---|---|
| Table primitives (`ReusableTable`, `PaginatedTable`) | ✅ | ❌ |
| Column definitions for a specific domain | ❌ | ✅ |
| The `FGProductItem` type | ❌ | ✅ (in `features/inventory/types/`) |
| The `cn` utility | ✅ | ❌ (import from `@/lib/utils`) |
| `useClientPagination` | ✅ | ❌ |
| `useStockIn` (API hook) | ❌ | ✅ (in `features/inventory/hooks/`) |
| `SidebarContext` | ✅ (in `lib/providers/`) | ❌ |
| `StockInContext` (form state) | ❌ | ✅ (in `features/inventory/components/stock-in/`) |
| `sidebarNav` config | ✅ (in `lib/constants/`) | ❌ |
| Mock data for a specific feature | Nope — move to `lib/mock-data/<domain>/` | Only if it truly belongs to one feature |

### Preventing Circular Dependencies

**Rule 1 — Features NEVER import from each other directly.**
If `inventory` needs a buyer list (from `crm`), it calls the API (or a shared service), not `import { buyers } from '@/features/crm'`.

**Rule 2 — `lib/` never imports from `features/`.**
Data flows upward: `lib/` → `features/` → `app/`.

**Rule 3 — `components/ui/` never imports from `features/`.**
UI primitives are framework-agnostic; they accept data via props, never pull from feature hooks.

**Rule 4 — Types can be safely shared via `features/<domain>/types/`.**
It is acceptable for `features/inventory` to import a type like `Buyer` from `features/crm/types/crm.types.ts` for a dropdown — but not to import components or hooks from another feature.

---

## 8. Future API Integration Strategy

### HTTP Client (`lib/api/http-client.ts`)

A single base fetch wrapper that:
- Reads `NEXT_PUBLIC_API_URL` from env
- Attaches the auth token from session storage
- Handles `401` → redirect to login
- Returns typed responses

```ts
// Conceptual shape — do not copy verbatim
async function apiGet<T>(endpoint: string): Promise<T>
async function apiPost<T, B>(endpoint: string, body: B): Promise<T>
async function apiPut<T, B>(endpoint: string, body: B): Promise<T>
async function apiDelete<T>(endpoint: string): Promise<T>
```

### API Endpoints (`lib/api/endpoints.ts`)

```ts
export const API = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  inventory: {
    stockIn: '/inventory/stock-in',
    stockOut: '/inventory/stock-out',
    batches: '/inventory/batches',
  },
  products: {
    master: '/products/master',
    variants: '/products/variants',
  },
  // … etc.
}
```

### Service Layer (`features/<domain>/services/`)

```ts
// features/inventory/services/inventory.service.ts
import { apiGet, apiPost } from '@/lib/api/http-client'
import { API } from '@/lib/api/endpoints'
import type { BatchItem, CreateStockInRequest } from '../types/inventory.types'

export async function getBatches(): Promise<BatchItem[]> {
  return apiGet<BatchItem[]>(API.inventory.batches)
}

export async function createStockIn(payload: CreateStockInRequest): Promise<void> {
  return apiPost(API.inventory.stockIn, payload)
}
```

### Data-Fetching Hooks (`features/<domain>/hooks/`)

**Recommended approach: React Query (`@tanstack/react-query`)**

Reasons it fits this project:
- The app already has the dual-mode `PaginatedTable` that accepts `isLoading`, `error`, `totalPages`, `onPageChange` — all of which React Query provides naturally.
- 9 report pages and multiple list pages will all need caching, stale-while-revalidate, and background refetch.
- `useMutation` maps perfectly to `handleCreate` / `handleUpdate` operations that currently live awkwardly in Contexts.
- The project has no server-side data-fetching needs (it's a client dashboard), so React Query on the client is the right fit.

```ts
// features/inventory/hooks/use-batch-list.ts
import { useQuery } from '@tanstack/react-query'
import { getBatches } from '../services/inventory.service'

export function useBatchList() {
  return useQuery({
    queryKey: ['inventory', 'batches'],
    queryFn: getBatches,
  })
}
```

Pages simply become:
```tsx
// app/(dashboard)/inventory/batch-list/page.tsx
'use client'
import { useBatchList } from '@/features/inventory/hooks/use-batch-list'
import { batchColumns } from '@/features/inventory/components/batch-list/batch-table'
import PaginatedTable from '@/components/ui/tables/paginated-table'

export default function BatchListPage() {
  const { data, isLoading, error } = useBatchList()
  return <PaginatedTable data={data} columns={batchColumns} isLoading={isLoading} error={error} />
}
```

### How API Responses Flow

```
API Response (JSON)
      ↓
Service function (typed as domain type, e.g. BatchItem[])
      ↓
React Query cache (keyed by domain + params)
      ↓
Feature hook (useQuery result)
      ↓
Page component (passes data/isLoading/error as props)
      ↓
PaginatedTable (renders UI)
```

### Where Request/Response Types Live

- **Domain types** (entities the UI cares about): `features/<domain>/types/<domain>.types.ts`
- **Request shapes** (API POST/PUT payloads): same file, suffix with `Request` (e.g. `CreateStockInRequest`)
- **Response shapes** (raw API JSON if it differs from UI shape): same file, suffix with `Response` or `Dto` — then add a mapper function in the service to transform DTO → domain type

### Handling Loading / Error / Caching / Mutations / Auth

| Concern | Where it goes |
|---|---|
| Loading state | `isLoading` from `useQuery` → passed to `PaginatedTable` |
| Error state | `error` from `useQuery` → passed to `PaginatedTable` |
| Caching | React Query's `queryKey` + `staleTime` config |
| Mutations | `useMutation` in `features/<domain>/hooks/` — calls the service, invalidates related query |
| Auth tokens | `lib/auth/session.ts` — stored in httpOnly cookie or memory, read by HTTP client |
| Route protection | `middleware.ts` at project root — checks session, redirects to `/login` |

---

## 9. Example: Batch List Page in the Proposed Architecture

**Current state:**

- Types: `BatchItem` + `batchColumns` + `batchData` all defined in `lib/product-data/batch-data.ts` (517 lines)
- Page: `batch-list/page.tsx` imports from `lib/product-data/batch-data` and renders data inline

**In the proposed architecture:**

```
lib/mock-data/inventory/batch.mock.ts
  → exports: batchData (the 200+ mock records, clearly labeled as mock)

features/inventory/types/inventory.types.ts
  → exports: BatchItem (the entity type, matching what the API will return)

features/inventory/components/batch-list/batch-table.tsx
  → exports: batchColumns (ColumnDef<BatchItem>[], the UI concern)

features/inventory/services/inventory.service.ts
  → exports: getBatches(): Promise<BatchItem[]>
              (uses mock data today, calls apiGet() after API integration)

features/inventory/hooks/use-batch-list.ts
  → exports: useBatchList() → { data, isLoading, error }

app/(dashboard)/inventory/batch-list/page.tsx
  → 'use client'
  → calls useBatchList()
  → renders <PaginatedTable> with data, columns, isLoading, error
  → zero business logic
```

**This means:** When the real API is ready, you change **one file** — `inventory.service.ts` — from returning mock data to calling `apiGet(API.inventory.batches)`. Everything else (types, columns, hooks, page UI) stays exactly the same.

---

## 10. Migration Plan (Step-by-Step, Safest Order)

> **No step should break production.** Each step is independently deployable.

### Phase 0 — Housekeeping (0 risk)
1. Delete `src/lib/text.txt`
2. Rename `src/components/ui/SearchDropdown.tsx` → `search-dropdown.tsx`
3. Resolve the duplicate `src/lib/dashboard-data.tsx` — verify it is superseded by `src/lib/product-data/dashboard-data.tsx`, then delete the root-level one.

### Phase 1 — Create the `features/` skeleton (0 risk, additive only)
4. Create empty directories: `features/auth`, `features/inventory`, `features/dashboard`, `features/reports`, `features/products`, `features/crm`, `features/attributes`, `features/iam` — each with `components/`, `hooks/`, `services/`, `types/` subdirectories.
5. Create empty `lib/api/http-client.ts`, `lib/api/endpoints.ts`, `lib/mock-data/` directory tree.

### Phase 2 — Move types out of data files (low risk)
6. Extract types from `lib/product-data/*.ts` into their respective `features/<domain>/types/<domain>.types.ts`. Keep the old data files in place; update their imports to use the new types files.
7. Extract types from `lib/attribute-data/*.ts` into `features/attributes/types/attribute.types.ts`.
8. Extract `FGProductItem` from `components/stock-in/basic-info.tsx` → `features/inventory/types/inventory.types.ts`.
9. Extract `DocumentItem` from `components/stock-in/documents.tsx` → same file.
10. Extract all inline types from `role/page.tsx` and `user/page.tsx` into `features/iam/types/iam.types.ts`.

### Phase 3 — Move mock data to `lib/mock-data/` (low risk)
11. Move the actual data arrays from `lib/product-data/` and `lib/attribute-data/` into `lib/mock-data/<domain>/`.
12. Update imports in all pages and components.
13. Keep column definitions (`ColumnDef`) in their respective `features/<domain>/components/` files (not in mock data).

### Phase 4 — Move feature components into `features/` (medium risk — test each)
14. Move `components/stock-in/` → `features/inventory/components/stock-in/`. Update all imports.
15. Move `components/stock-out/` → `features/inventory/components/stock-out/`. Update all imports.
16. Move `components/delivery/` → `features/reports/components/delivery-summary/`. Update all imports.
17. Move `components/dashboard/` → `features/dashboard/components/`. Update all imports.

### Phase 5 — Move SidebarContext to `lib/providers/` (low risk)
18. Move `components/layout/sidebar-context.tsx` → `lib/providers/sidebar-context.tsx`. Update all imports. `app/layout.tsx` currently imports it; update that import.

### Phase 6 — Create service stubs (additive, no risk)
19. Create `features/inventory/services/inventory.service.ts` with stub functions that return the mock data:
    ```ts
    export async function getBatches() { return batchData; }
    ```
20. Repeat for every other domain.

### Phase 7 — Create feature hooks (additive, then replace)
21. Create `features/inventory/hooks/use-batch-list.ts` that calls the service.
22. Update `batch-list/page.tsx` to use `useBatchList()` instead of importing `batchData` directly.
23. Repeat for all list pages.

### Phase 8 — Standardize pagination (medium risk — test each page)
24. Identify pages still manually implementing pagination (`master-fg-product/page.tsx`).
25. Replace manual `useState`+`useMemo`+`Pagination` with `PaginatedTable` in each.

### Phase 9 — Install React Query & wire up (medium risk)
26. Install `@tanstack/react-query`.
27. Add `QueryClientProvider` in `app/layout.tsx` or `app/(dashboard)/layout.tsx`.
28. Convert service stubs from returning mock arrays to returning `Promise<T>` of mock data.
29. Wrap feature hooks with `useQuery`. (At this point the mock data flows through React Query — no visible change, but the architecture is API-ready.)

### Phase 10 — Build the HTTP client (depends on API availability)
30. Implement `lib/api/http-client.ts` with real fetch/axios.
31. Update services one by one to use `apiGet/apiPost` instead of returning mock data.
32. Add `middleware.ts` for route protection.
33. Implement proper auth in `features/auth/`.

---

## 11. Trade-offs

### Why Feature-First over Type-First?

A type-first structure (`components/`, `hooks/`, `services/`, `types/` at the top level) is easier to start with, but creates a problem as the project grows: you end up needing to navigate across 4 folders to understand one feature. Feature-first keeps everything related to "Inventory" in one place — easier to onboard new developers, easier to delete a whole feature if needed.

### Why not use Next.js Server Components more aggressively?

This is a client-rendered ERP dashboard with:
- Sticky sidebars, collapsible navigation, tab UI, interactive forms — all require `'use client'`
- Auth tokens that live in the browser (cookies/memory)
- No SEO requirement

Server Components would add complexity (mixing server/client boundaries for these interactive UIs) without benefit. RSC is the right call for content-heavy or SEO-sensitive apps; React Query is the right call for data-heavy client dashboards.

### Why React Query over SWR or raw `useEffect`?

| | React Query | SWR | raw useEffect |
|---|---|---|---|
| Mutation support | ✅ Built-in (`useMutation`) | ⚠️ Manual | ❌ Manual |
| Cache invalidation | ✅ `queryKey` invalidation | ⚠️ Limited | ❌ Manual |
| Loading/error/retry | ✅ | ✅ | ❌ Manual |
| Fits `PaginatedTable` props | ✅ Perfect match | ✅ | ❌ Requires wrapper |
| DevTools | ✅ Excellent | ⚠️ Basic | ❌ None |

React Query's `useMutation` + `invalidateQueries` pattern directly replaces the current simulated `setTimeout` in `StockInContext.handleCreate` with a real, cache-aware, retry-safe equivalent.

### Why not Redux or Zustand for global state?

The app currently has one piece of truly global state: sidebar collapse. That's handled perfectly by the existing Context + `useState` pattern. Feature-level form state (`StockInContext`) is local to a page. Neither case warrants a global store. If the app grows to need cross-feature shared state (e.g., a cart or multi-step wizard spanning multiple routes), introduce Zustand at that point — not before.

