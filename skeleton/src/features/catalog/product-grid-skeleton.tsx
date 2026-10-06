import { Skeleton } from '@/components/ui/skeleton'

const PLACEHOLDERS = [1, 2, 3, 4, 5, 6, 7, 8]

export function ProductGridSkeleton() {
  return (
    <div role="status" className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <span className="sr-only">Loading products</span>
      {PLACEHOLDERS.map((n) => (
        <div key={n} className="overflow-hidden rounded-lg border">
          <Skeleton className="aspect-square rounded-none" />
          <div className="grid gap-2 p-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-6 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}
