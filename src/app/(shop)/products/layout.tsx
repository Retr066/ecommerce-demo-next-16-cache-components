import { Suspense } from 'react';

function ProductsLoading() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse">
        <div className="h-12 bg-foreground/5 rounded mb-2" />
        <div className="h-6 bg-foreground/5 rounded w-64" />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64">
          <div className="h-64 bg-foreground/5 rounded animate-pulse" />
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-foreground/5 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ProductsLoading />}>
      {children}
    </Suspense>
  );
}
