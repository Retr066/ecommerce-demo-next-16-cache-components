import { Suspense } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';

function OrdersLoading() {
  return (
    <div className="max-w-4xl mx-auto py-16">
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-foreground/5 rounded" />
        <div className="h-64 bg-foreground/5 rounded" />
      </div>
    </div>
  );
}

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<OrdersLoading />}>
      <ProtectedRoute>{children}</ProtectedRoute>
    </Suspense>
  );
}
