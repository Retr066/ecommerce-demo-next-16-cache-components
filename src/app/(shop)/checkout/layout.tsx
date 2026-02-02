import { ProtectedRoute } from '@/components/auth/protected-route';
import { Suspense } from 'react';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return
  <Suspense fallback={<div>Cargando checkout...</div>}>
    <ProtectedRoute>{children}</ProtectedRoute>
  </Suspense>;
}
