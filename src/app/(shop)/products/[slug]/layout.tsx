import { Suspense } from 'react';

function ProductDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Imagen skeleton */}
        <div className="relative aspect-square bg-foreground/5 rounded-lg overflow-hidden animate-pulse" />

        {/* Info skeleton */}
        <div className="space-y-6">
          {/* Badge y título */}
          <div>
            <div className="h-6 w-24 bg-foreground/5 rounded mb-2 animate-pulse" />
            <div className="h-10 bg-foreground/5 rounded mb-4 animate-pulse" />
            <div className="h-9 w-32 bg-foreground/5 rounded mb-4 animate-pulse" />
          </div>

          {/* Descripción */}
          <div>
            <div className="h-6 w-32 bg-foreground/5 rounded mb-2 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-foreground/5 rounded animate-pulse" />
              <div className="h-4 bg-foreground/5 rounded animate-pulse" />
              <div className="h-4 bg-foreground/5 rounded w-3/4 animate-pulse" />
            </div>
          </div>

          {/* Stock y botón */}
          <div>
            <div className="h-5 w-48 bg-foreground/5 rounded mb-4 animate-pulse" />
            <div className="h-12 bg-foreground/5 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ProductDetailLoading />}>
      {children}
    </Suspense>
  );
}
